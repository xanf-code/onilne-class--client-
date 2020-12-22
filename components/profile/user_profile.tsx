import useUser from "../../hooks/use_user";

export interface UserProfileProps {
  email: string;
}

export default function UserProfileData({ email }: UserProfileProps) {
  const { user, isLoading, isError } = useUser(email);

  return (
    <>
      {isError ? (
        <div>O email {email} não existe no banco de dados</div>
      ) : isLoading ? (
        <div>Loading user profile...</div>
      ) : (
        user && (
          <>
            <div>O email {email} está logado no momento</div>{" "}
            <div>name: {user.name}</div>
            <div>coins: {user.coins}</div>
          </>
        )
      )}
    </>
  );
}
