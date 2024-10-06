"use client";

import { province, district, ward } from "../../../../api/address";
import { createStudent } from "@/app/api/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  id: z.number().optional(),
  teacher_id: z.string().optional(),
  code: z
    .string()
    .min(10, { message: "Mã sinh viên phải đủ 10 ký tự" })
    .max(10, { message: "Mã sinh viên phải đủ 10 ký tự" }),
  password: z.string().optional(),
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại" })
    .max(10, { message: "Vui lòng nhập đúng định dạng số điện thoại" }),
  name: z
    .string()
    .max(255, { message: "Tên sinh viên tối đa 255 ký tự" })
    .min(1, { message: "Vui lòng nhập đầy đủ họ tên sinh viên" }),
  profile_id: z
    .string()
    .min(9, { message: "Vui lòng nhập đúng số CMT" })
    .max(12, { message: "Vui Lòng nhập đúng số CCCD" }),
  email: z
    .string()
    .email("Địa chỉ email không hợp lệ")
    .max(255, "Email tối đa 255 ký tự"),
  avatar: z.string().optional(),
  gender: z.enum(["1", "2"], { message: "Vui lòng chọn giới tính" }),
  birthday: z.string().min(1, { message: "Vui lòng nhập ngày sinh" }),
  // .refine((value) => value !== null, {
  //   message: "Vui lòng nhập đầy đủ thông tin ngày sinh",
  // })
  joined_date: z.string().min(1, { message: "Vui lòng nhập ngày sinh" }),
  // .refine((value) => value !== null, {
  //   message: "Vui lòng nhập ngày nhập học",
  // })
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  province_id: z.string().min(1, { message: "Vui lòng chọn tỉnh/thành phố" }),
  district_id: z.string().min(1, { message: "Vui lòng chọn quận/huyện" }),
  ward_id: z.string().min(1, { message: "Vui lòng chọn xã/phường" }),
  address_full: z.string(),
  classify: z.enum(["1", "2", "3"], { message: "Vui lòng chọn phân loại" }),
  data: z.any().optional(),
});

export default function StudentProfileForm({
  type = "create",
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [avatar, setAvatar] = useState<string | undefined>(data?.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get Default Values in input fields
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data?.id || undefined,
      teacher_id: data?.teacher_id || undefined,
      code: data?.code || "",
      password: "",
      phone: data?.phone || "",
      name: data?.name || "",
      profile_id: data?.profile_id || "",
      email: data?.email || "",
      avatar: data?.avatar || "",
      gender: data?.gender || "",
      birthday: data?.birthday || "",
      joined_date: data?.joined_date || "",
      address_full: data?.address || "",
      province_id: data?.province_id || "",
      district_id: data?.district_id || "",
      ward_id: data?.ward_id || "",
      classify: data?.classify || "",
      data: data?.data || null,
    },
  });

  // Fetch Provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await province();
      if (response.success && "result" in response) {
        setProvinces(response.result);
      }
    };

    fetchProvinces();
  }, []);
  // Fetch Districts
  useEffect(() => {
    const selectedProvinceId = form.watch("province_id");
    if (selectedProvinceId) {
      const fetchDistrict = async () => {
        const response = await district(selectedProvinceId);
        if (response.success && "result" in response) {
          setDistricts(response.result);
        }
      };
      fetchDistrict();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("province_id")]);
  // Fetch wards
  useEffect(() => {
    const selectedDistrictId = form.watch("district_id");
    if (selectedDistrictId) {
      const fetchWard = async () => {
        const response = await ward(selectedDistrictId);
        if (response.success && "result" in response) {
          setWards(response.result);
        }
      };
      fetchWard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("district_id")]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submitData = {
      ...values,
      password: values.profile_id,
      avatar: avatar || undefined,
    };
    // WTF, check it
    const { success, result, message } = await createStudent(submitData);
    if (success) {
      alert(result);
    } else {
      alert(message);
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // use Uploadthing to store Image and get its response address
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
        form.setValue("avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {type === "create"
            ? "Tạo Hồ Sơ Sinh Viên"
            : "Cập Nhật Hồ Sơ Sinh Viên"}
        </CardTitle>
        <CardDescription>
          {type === "create"
            ? "Tạo mới hồ sơ sinh viên"
            : "Cập nhật hồ sơ sinh viên"}
        </CardDescription>
      </CardHeader>
      {/* Card */}
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Thông Tin Cá Nhân</TabsTrigger>
              <TabsTrigger value="contact">Liên Hệ</TabsTrigger>
              <TabsTrigger value="address">Địa Chỉ</TabsTrigger>
              <TabsTrigger value="other">Thông Tin Khác</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="space-y-4 mt-4">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <Avatar
                  className="w-24 h-24 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <AvatarImage src={avatar || undefined} />
                  <AvatarFallback>
                    {form.getValues("name")?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="avatar">Ảnh Đại Diện</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn Ảnh
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ Tên</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Họ và Tên Sinh Viên"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                {/* Default Information */}
                <div className="space-y-2">
                  <Label htmlFor="code">Mã Số Sinh Viên</Label>
                  <Input
                    id="code"
                    {...form.register("code")}
                    placeholder="MSSV"
                  />
                  {form.formState.errors.code && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.code.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile_id">CCCD/CMT</Label>
                  <Input
                    id="profile_id"
                    {...form.register("profile_id")}
                    placeholder="CCCD/CMT"
                  />
                  {form.formState.errors.profile_id && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.profile_id.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_id">Mã Chủ Nhiệm</Label>
                  <Input
                    id="teacher_id"
                    {...form.register("teacher_id", { required: false })}
                    placeholder="Mã Giảng Viên Chủ Nhiệm"
                  />
                </div>
                {/* <div className="space-y-2">
                  <TabsContent value="teacher_id" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="data">Mã Chủ Nhiệm</Label>
                      <Textarea
                        id="teacher_id"
                        {...form.register("teacher_id")}
                        placeholder="Nhập dữ liệu bổ sung (nếu có)"
                      />
                    </div>
                  </TabsContent>
                </div> */}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ngày Sinh</Label>
                  <Input type="date" {...form.register("birthday")} />
                  {form.formState.errors.birthday && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.birthday.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Ngày Nhập Học</Label>
                  <Input type="date" {...form.register("joined_date")} />
                  {form.formState.errors.joined_date && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.joined_date.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Giới Tính</Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      form.setValue("gender", value as "1" | "2")
                    }
                    defaultValue={form.getValues("gender")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="male" />
                      <Label htmlFor="male">Nam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="female" />
                      <Label htmlFor="female">Nữ</Label>
                    </div>
                  </RadioGroup>
                  {form.formState.errors.gender && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.gender.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classify">Phân Loại</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("classify", value as "1" | "2" | "3")
                    }
                    defaultValue={form.getValues("classify")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phân loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Tiềm Năng</SelectItem>
                      <SelectItem value="2">Đang Học</SelectItem>
                      <SelectItem value="3">Đã Tốt Nghiệp</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.classify && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.classify.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            {/* Contact */}
            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Số Điện Thoại</Label>
                <Input id="phone" {...form.register("phone")} />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </TabsContent>
            {/* Address */}
            <TabsContent value="address" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province_id">Tỉnh/Thành Phố</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("province_id", value)
                    }
                    defaultValue={form.getValues("province_id")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province: any) => (
                        <SelectItem
                          key={province.id}
                          value={province.id.toString()}
                        >
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.province_id && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.province_id.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district_id">Quận/Huyện</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("district_id", value)
                    }
                    defaultValue={form.getValues("district_id")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district: any) => (
                        <SelectItem
                          key={district.id}
                          value={district.id.toString()}
                        >
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.district_id && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.district_id.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ward_id">Xã/Phường</Label>
                  <Select
                    onValueChange={(value) => form.setValue("ward_id", value)}
                    defaultValue={form.getValues("ward_id")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn xã/phường" />
                    </SelectTrigger>
                    <SelectContent>
                      {wards.map((ward: any) => (
                        <SelectItem key={ward.id} value={ward.id.toString()}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.ward_id && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.ward_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa Chỉ</Label>
                <Input id="address" {...form.register("address")} />
                {form.formState.errors.address && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="other" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="data">Dữ Liệu Bổ Sung</Label>
                <Textarea
                  id="data"
                  {...form.register("data")}
                  placeholder="Nhập dữ liệu bổ sung (nếu có)"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button
            type="submit"
            className="w-full"
            // disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo hồ sơ...
              </span>
            ) : type === "create" ? (
              "Tạo Hồ Sơ"
            ) : (
              "Cập Nhật Hồ Sơ"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
