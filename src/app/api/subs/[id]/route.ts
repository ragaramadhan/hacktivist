export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    console.log(id);
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
