import z from "zod";

const UserPage = async ({ params } : { params: Promise<{ id: string }>}) => {
  const postId = (await params).id;
  /*
    TODO 1: validate id
  */
  return (
    <div className="bg-black min-h-screen pt-17 text-white flex justify-center">
      
    </div>
  )
}

export default UserPage;