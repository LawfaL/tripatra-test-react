import React from "react";
import { ModalCreateUser } from "./modal-create-user";
import { SectionHead } from "./section-head";
import { GET_USERS } from "@/apollo/queries";
import { User } from "./user";
import { useQuery } from "@apollo/client";
import { UserDetail } from "./user-detail";

const ContainerUserMemo = () => {
  const { data, refetch } = useQuery(GET_USERS);

  return (
    <>
      <SectionHead
        title="Our teams"
        description="Meet our dedicated team of professionals."
        actions={<ModalCreateUser refetch={refetch} />}
      />
      <div className="mt-5 grid grid-cols-6 gap-5 flex-wrap">
        {data?.getAllUser.map((user: any, index: number) => (
          <UserDetail index={index} data={user} refetch={refetch}>
            <button>
              <User index={index} data={user} />
            </button>
          </UserDetail>
        ))}
      </div>
    </>
  );
};

export const ContainerUser = React.memo(ContainerUserMemo);
