import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log(user);
    const res = NextResponse.json({
      message: "User Found",
      data: user,
    });
    console.log(res);
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
