import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeEach(async () => {
  // Faculty
  await prisma.faculty.create({
    data: {
      faculty_id: "FAC01",
      faculty_name: "Faculty of Science",
      faculty_address: "123 University Ave",
    },
  });

  // User
  await prisma.user.create({
    data: {
      user_id: "USER01",
      user_name: "John Doe",
      image_url: "http://example.com/image.jpg",
      gender: "Male",
      role: "Student",
      school_email: "john.doe@example.com",
      personal_email: "john.doe@gmail.com",
      contact_no: "123-456-7890",
      citizen_id: "CITIZEN01",
      ethnicity: "Asian",
      date_of_birth: new Date("2000-01-01"),
      faculty_id: "FAC01",
    },
  });

  // Account
  await prisma.account.create({
    data: {
      user_id: "USER01",
      account_password: "hashed_password",
      default_password: "CITIZEN01",
    },
  });

  // Session
  await prisma.session.create({
    data: {
      session_id: "SESSION01",
      user_id: "USER01",
      ip_address: "192.168.1.1",
      device_info: "Chrome on Windows",
    },
  });

  // UserChangeHistory
  await prisma.userChangeHistory.create({
    data: {
      history_id: "HISTORY01",
      user_id: "USER01",
      field_name: "contact_no",
      old_value: "123-456-7890",
      new_value: "098-765-4321",
      changed_by: "USER01",
    },
  });

  // Tạo một Student liên kết với User
  await prisma.student.create({
    data: {
      user_id: "USER01",
      class_id: "CLASS01", // Ensure that this class_id exists
    },
  });

  // Admin
  await prisma.admin.create({
    data: {
      user_id: "USER01",
    },
  });

  // Teacher
  await prisma.teacher.create({
    data: {
      user_id: "USER01",
      degree: "PhD",
      position: "Professor",
    },
  });

  // (optional, in case you want to test this relation)
});

afterEach(async () => {
  // Dọn dẹp dữ liệu sau mỗi test
  await prisma.$transaction([
    prisma.user.deleteMany({}),
    prisma.account.deleteMany({}),
    prisma.session.deleteMany({}),
    prisma.userChangeHistory.deleteMany({}),
    prisma.student.deleteMany({}),
    prisma.admin.deleteMany({}),
    prisma.teacher.deleteMany({}),
    prisma.faculty.deleteMany({}),
  ]);
});

describe("User Integration Tests", () => {
  it("Kiểm tra tạo và lấy dữ liệu User", async () => {
    const user = await prisma.user.findUnique({
      where: {
        user_id: "USER01",
      },
      include: {
        faculty: true,
        account: true,
        sessions: true,
        change_history: true,
        student: true,
        admin: true,
        teacher: true,
      },
    });

    expect(user).not.toBeNull();
    expect(user?.user_name).toBe("John Doe");
    expect(user?.faculty?.faculty_id).toBe("FAC01");
    expect(user?.account?.account_password).toBe("hashed_password");
    expect(user?.sessions.length).toBe(1);
    expect(user?.change_history.length).toBe(1);
    expect(user?.student).not.toBeNull();
    expect(user?.admin).not.toBeNull();
    expect(user?.teacher).not.toBeNull();
  });

  it("Kiểm tra tạo và lấy dữ liệu Account", async () => {
    const account = await prisma.account.findUnique({
      where: {
        user_id: "USER01",
      },
    });

    expect(account).not.toBeNull();
    expect(account?.account_password).toBe("hashed_password");
  });

  it("Kiểm tra tạo và lấy dữ liệu Session", async () => {
    const session = await prisma.session.findUnique({
      where: {
        session_id: "SESSION01",
      },
      include: {
        user: true,
      },
    });

    expect(session).not.toBeNull();
    expect(session?.ip_address).toBe("192.168.1.1");
    expect(session?.user.user_id).toBe("USER01");
  });

  it("Kiểm tra tạo và lấy dữ liệu UserChangeHistory", async () => {
    const changeHistory = await prisma.userChangeHistory.findUnique({
      where: {
        history_id: "HISTORY01",
      },
      include: {
        user: true,
      },
    });

    expect(changeHistory).not.toBeNull();
    expect(changeHistory?.field_name).toBe("contact_no");
    expect(changeHistory?.user.user_id).toBe("USER01");
  });

  it("Kiểm tra tạo và lấy dữ liệu Student", async () => {
    const student = await prisma.student.findUnique({
      where: {
        user_id: "USER01",
      },
      include: {
        user: true,
        class: true,
      },
    });

    expect(student).not.toBeNull();
    expect(student?.user.user_id).toBe("USER01");
  });

  it("Kiểm tra tạo và lấy dữ liệu Admin", async () => {
    const admin = await prisma.admin.findUnique({
      where: {
        user_id: "USER01",
      },
      include: {
        user: true,
      },
    });

    expect(admin).not.toBeNull();
    expect(admin?.user.user_id).toBe("USER01");
  });

  it("Kiểm tra tạo và lấy dữ liệu Teacher", async () => {
    const teacher = await prisma.teacher.findUnique({
      where: {
        user_id: "USER01",
      },
      include: {
        user: true,
      },
    });

    expect(teacher).not.toBeNull();
    expect(teacher?.user.user_id).toBe("USER01");
  });
});

afterAll(async () => {
  // Đóng kết nối sau khi tất cả các test hoàn thành
  await prisma.$disconnect();
});
