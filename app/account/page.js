import { auth } from "../_lib/auth";

const page = async () => {
  const { user } = await auth();
  return (
    <h1>
      Hello, <span className="font-bold text-accent-600"> {user.name}</span>
    </h1>
  );
};

export default page;
