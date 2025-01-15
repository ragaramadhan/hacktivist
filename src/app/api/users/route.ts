import // createSubsFirstRegister,
// extractObjectIdString
"@/models/subscription";
import {
  getUserByEmail,
  registerUser,
  updateUser,
  // updateUser
} from "@/models/user";
import { UserUpdateType } from "@/types/userType";
import { z } from "zod";

const profileSchema = z.object({
  address: z.string(),
  birth: z.string(),
});

const userInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.string(),
  profile: profileSchema,
});

export const POST = async (request: Request) => {
  try {
    // console.log(request);

    const data = await request.json();

    const parse = userInput.parse(data);

    // console.log(`hehe`);
    // const user =
    await registerUser(parse);

    // const check = await extractObjectIdString(user.insertedId);

    // const subsRegister = {
    //   userId: check,
    //   type: "free",
    // };
    // await createSubsFirstRegister(subsRegister); //pada setiap kali akun register maka akan membuat subs
    return Response.json(
      {
        statusCode: 201,
        message: `Success Register`,
        // check,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          statusCode: 400,
          message: "Validation failed",
          errors: error.errors,
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (request: Request) => {
  try {
    const data = await request.json();
    const email = data.email;
    const user = await getUserByEmail(email);
    return Response.json(user);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    // console.log("masuk put nih bang!");
    const data = await request.json();
    // console.log("data: ", data);
    const { email, picture } = data;
    // console.log("email: ", email);
    // console.log("picture: ", picture);

    if (!email || !picture) {
      return Response.json(
        {
          statusCode: 400,
          message: "Email and picture are required",
        },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return Response.json(
        {
          statusCode: 404,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (picture !== undefined) user.profile.picture = picture;
    user.updatedAt = new Date().toISOString();

    const updatedUser = await updateUser(user as UserUpdateType);

    return Response.json(updatedUser);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
};
