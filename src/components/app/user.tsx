import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserMemo = ({ data, index }) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-[150px] h-[150px] hover:scale-105">
        <AvatarImage
          src={`https://randomuser.me/api/portraits/${
            index % 3 == 0 ? "men" : "women"
          }/${index + 1}.jpg`}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="space-y-1 text-sm mt-3">
        <h3 className="font-medium leading-none">{data?.name}</h3>
      </div>
    </div>
  );
};

export const User = React.memo(UserMemo);
