"use client";
import { useGetUserListQuery } from "@/features/demo/redux/usersApi";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./colums";
import { Button } from "@/components/ui/button";

const DemoNewPage = () => {
    const { data: rtkData, isLoading, error } = useGetUserListQuery({ del_yn: "N", page_startnum: 1, page_endnum: 10 });

    const check = () => {
        console.log("dd");
    };
    return (
        <div className="container mx-auto py-10">
            <Button onClick={check}>흠</Button>
            {isLoading ? (
                <Spinner />
            ) : rtkData ? (
                <>
                    <DataTable columns={columns} data={rtkData.list} />
                </>
            ) : null}
        </div>
    );
};

export default DemoNewPage;
