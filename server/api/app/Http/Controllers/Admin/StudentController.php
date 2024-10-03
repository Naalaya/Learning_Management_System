<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

// Models
use App\Models\Student;

// Resources
use App\Http\Resources\{
    Admin\StudentInfoResource,
    Admin\StudentListResource,
    BasicOptionResource
};

// Requests
use App\Http\Requests\Admin\StudentRequest;

// Utils
use App\Utils\Consts;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit   = Consts::LIMIT;
            $keyword = "%{$request->keyword}%";
            $recordsStudent = Student::query()
            ->when(!empty($request->keyword), fn($query) => $query->where('name', $keyword))
            ->orderBy('id', 'DESC')
            ->paginate($limit);

            return response()->json([
                'code'      => 200,
                'result'    => [
                    'page'  => $recordsStudent->currentPage(),
                    'total' => $recordsStudent->total(),
                    'limit' => $limit,
                    'items' => StudentListResource::collection($recordsStudent->items()),
                ]
            ], 200);

        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    public function option()
    {
        try {
            $recordsStudent = Student::orderBy('id', 'DESC')->get();

            return response()->json([
                'code'      => 200,
                'result'    => BasicOptionResource::collection($recordsStudent)
            ], 200);

        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    public function show($id)
    {
        try {
            $recordStudent = Student::where('id', $id)->first();

            if (is_null($recordStudent)) {
                throw new \Exception('Học sinh không tồn tại.', 404);
            }

            return response()->json([
                'code'      => 200,
                'result'    => new StudentInfoResource($recordStudent)
            ], 200);

        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    public function store(StudentRequest $request)
    {
        try {
            if (Student::where('code', $request->code)->exists()) {
                throw new \Exception('Mã học sinh đã tồn tại. Vui lòng kiểm tra lại.', 409);
            }

            if (Student::where('phone', $request->phone)->exists()) {
                throw new \Exception('Số điện thoại đã tồn tại. Vui lòng kiểm tra lại.', 409);
            }

            if (Student::where('email', $request->email)->exists()) {
                throw new \Exception('Email đã tồn tại. Vui lòng kiểm tra lại.', 409);
            }

            $recordStudent = new Student();
            $recordStudent->teacher_id    = $request->teacher_id;
            $recordStudent->code          = $request->code;
            $recordStudent->password      = bcrypt($request->code);
            $recordStudent->phone         = $request->phone;
            $recordStudent->name          = $request->name;
            $recordStudent->profile_id    = $request->profile_id;
            $recordStudent->email         = $request->email;
            $recordStudent->avatar        = $request->avatar;
            $recordStudent->gender        = $request->gender;
            $recordStudent->birthday      = $request->birthday;
            $recordStudent->joined_date   = $request->joined_date;
            $recordStudent->address       = $request->address;
            $recordStudent->province_id   = $request->province_id;
            $recordStudent->district_id   = $request->district_id;
            $recordStudent->ward_id       = $request->ward_id;
            $recordStudent->classify      = $request->classify;
            $recordStudent->save();

            return response()->json([
                'code'      => 200,
                'message'   => 'Tạo học sinh mới thành công.',
                'result'    => [
                    'id' => $recordStudent->id
                ]
            ], 200);

        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    public function update(StudentRequest $request, $id)
    {
        try {
            $recordStudent = Student::where('id', $id)->first();
            if (is_null($recordStudent)) {
                throw new \Exception('Học sinh không tồn tại.', 404);
            }

            if (Hash::check($recordStudent->password, bcrypt($request->password))) {
                $recordStudent->password  = bcrypt($request->password);
            }
            $recordStudent->teacher_id    = $request->teacher_id;
            $recordStudent->phone         = $request->phone;
            $recordStudent->name          = $request->name;
            $recordStudent->email         = $request->email;
            $recordStudent->avatar        = $request->avatar;
            $recordStudent->gender        = $request->gender;
            $recordStudent->birthday      = $request->birthday;
            $recordStudent->joined_date   = $request->joined_date;
            $recordStudent->address       = $request->address;
            $recordStudent->province_id   = $request->province_id;
            $recordStudent->district_id   = $request->district_id;
            $recordStudent->ward_id       = $request->ward_id;
            $recordStudent->classify      = $request->classify;
            $recordStudent->save();

            return response()->json([
                'code'      => 200,
                'message'   => 'Cập nhật học sinh thành công.',
            ], 200);

        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }

    public function destroy($id)
    {
        try {
            $recordStudent = Student::where('id', $id)->first();
            if (is_null($recordStudent)) {
                throw new \Exception('Học sinh không tồn tại.', 404);
            }

            $recordStudent->delete();

            return response()->json([
                'code'      => 200,
                'message'   => 'Xóa học sinh thành công.',
            ], 200);

        } catch (\Exception $e) {
            return $this->catchResponse($e);
        }
    }
}
