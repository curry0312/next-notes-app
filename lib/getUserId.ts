type getUserIdParams = {
  session: any;
};

export async function getUserId({ session }: getUserIdParams):Promise<void> {
  try {
    const res = await fetch(
      `/api/user/getUser/${session?.user?.email}`
    );
    const { userId } = await res.json();
    console.log("userId:", userId);
    return userId;
  } catch (error) {
    console.log(error)
  }
}
