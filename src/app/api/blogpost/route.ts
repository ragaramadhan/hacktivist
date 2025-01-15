import { createBlog, readBlogAll } from "@/models/blogpost";

export const POST = async (request: Request) => {
  const data = await request.json();
  const authorId = request.headers.get("rg-user-id");
  // untuk sementara orang yang login nya masi pake hardcode nanti bisa ambil lewat headers
  data.authorId = authorId;
  await createBlog(data);

  return Response.json(
    {
      statusCode: 201,
      message: "Succes Add Product",
    },
    {
      status: 201,
    }
  );
};

export const GET = async () => {
  const data = await readBlogAll();

  return Response.json({
    statusCode: 200,
    data,
  });

  // return Response.json(data);
};
