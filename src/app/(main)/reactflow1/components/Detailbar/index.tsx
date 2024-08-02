"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateRandomId } from "@/common/utils/generateId";

const nodeFormSchema = z.object({
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(50),
    desc: z.string(),
});

const edgeFormSchema = z.object({
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(50),
    desc: z.string(),
});

export default function Detailbar({ detail }) {
    const nodeForm = useForm<z.infer<typeof nodeFormSchema>>({
        resolver: zodResolver(nodeFormSchema),
    });
    const { setValue } = nodeForm;
    if (detail?.clicked == "node") {
        setValue("name", detail.data.title);
        setValue("type", detail.type);
        setValue("desc", detail.data.desc);
    }

    const edgeForm = useForm<z.infer<typeof edgeFormSchema>>({
        resolver: zodResolver(edgeFormSchema),
        defaultValues: {
            name: "",
            desc: "",
            type: "",
        },
    });

    function onNodeFormSubmit(values: z.infer<typeof nodeFormSchema>) {
        nodeForm.reset();
        console.log(values);
    }

    function onEdgeFormSubmit(values: z.infer<typeof edgeFormSchema>) {
        edgeForm.reset();
        console.log(values);
    }

    return (
        <>
            <div className="relative border-l-2 px-3 w-1/5">
                <h3 className="text-xl">{detail?.click_name}</h3>
                <p className="text-sm text-[#626F86] mb-5">{detail?.click_desc}</p>
                {detail ? (
                    detail.clicked == "node" ? (
                        <>
                            <Form {...nodeForm}>
                                <form onSubmit={nodeForm.handleSubmit(onNodeFormSubmit)} className="grid gap-4 py-4">
                                    <FormField
                                        control={nodeForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel className="">Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="상태명을 입력하세요"
                                                        {...field}
                                                        className="col-span-3"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={nodeForm.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel className="">Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="col-span-3">
                                                            <SelectValue placeholder="타입을 선택하세요" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="input">시작</SelectItem>
                                                        <SelectItem value="default">진행</SelectItem>
                                                        <SelectItem value="output">종료</SelectItem>
                                                        <SelectItem value="any">Any Type</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={nodeForm.control}
                                        name="desc"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel className="">Desc</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="설명을 입력하세요"
                                                        {...field}
                                                        className="col-span-3"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                            <Button>규칙 추가</Button>
                        </>
                    ) : (
                        <>
                            <Form {...edgeForm}>
                                <form onSubmit={edgeForm.handleSubmit(onEdgeFormSubmit)} className="grid gap-4 py-4">
                                    <FormField
                                        control={edgeForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel className="">Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="상태명을 입력하세요"
                                                        {...field}
                                                        className="col-span-3"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={edgeForm.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel className="">Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="col-span-3">
                                                            <SelectValue placeholder="타입을 선택하세요" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="시작">시작</SelectItem>
                                                        <SelectItem value="진행">진행</SelectItem>
                                                        <SelectItem value="종료">종료</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={edgeForm.control}
                                        name="desc"
                                        render={({ field }) => (
                                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                                <FormLabel className="">Desc</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="설명을 입력하세요"
                                                        {...field}
                                                        className="col-span-3"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                            {/* <Button>트렌젝션</Button> */}
                        </>
                    )
                ) : (
                    <div>너의꿈을 펼쳐봐..</div>
                )}
                {detail && <pre>{JSON.stringify(detail, null, 2)}</pre>}
            </div>
        </>
    );
}
