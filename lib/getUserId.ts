export async function getUserId(session:any) {
    const res = await fetch(
      `http://localhost:3000/api/user/getUser/${session?.user?.email}`
    );
    const {userId} = await res.json()
    console.log("userId:",userId)
    return userId
  }