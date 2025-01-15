import { findUserRoleLawyer, registerLawyer } from "@/models/user";
import { z } from "zod";

const profileSchema = z.object({
  address: z.string(),
  birth: z.string(),
});

const credentialsSchema = z.object({
  education: z.string().array(),
  certification: z.string(),
});

const lawyerInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.string(),
  profile: profileSchema,
  specialization: z.string(),
  credentials: credentialsSchema,
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const parse = lawyerInput.parse(data);

    await registerLawyer(parse);

    return Response.json(
      {
        statusCode: 201,
        message: `Success Register Lawyer`,
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
  }
};

export const GET = async () => {
  console.log(`masuk sini`);

  const data = await findUserRoleLawyer();

  return Response.json({
    statusCode: 200,
    data,
  });
};
