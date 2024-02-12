import ArcadeLoader from "@/components/shared/ArcadeLoader";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { UserCard } from "@/components/shared";

const AllUsers = () => {
  const { data: creators, isPending } = useGetUsers();

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isPending && !creators ? (
          <div className="flex-center w-full h-full">
            <ArcadeLoader />
          </div>
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
