"use client";
import { useGetUserListQuery } from "@/features/demo/redux/usersApi";
import { UserListRes, columns } from "../colums";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/data-table";

const DemoNewPage = () => {
    const { data: rtkData, isLoading, error } = useGetUserListQuery({ del_yn: "N", page_startnum: 1, page_endnum: 10 });
    if (rtkData) console.log("rtkData", rtkData);

    if (isLoading) return <Spinner />;
    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <>Loading...</>
            ) : rtkData ? (
                <>
                    <DataTable columns={columns} data={rtkData.list} />
                </>
            ) : null}
        </div>
    );
};

export default DemoNewPage;
