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

const formSchema = z.object({
    name: z.string().min(1).max(50),
    type: z.string().min(1).max(50),
    desc: z.string(),
});

export default () => {
    const [open, setOpen] = React.useState(false);
    const [leftItem, setLeftItem] = useState([
        {
            id: "1",
            name: "OPEN",
            desc: "설명1",
            type: "시작",
            color: "#ff5f99",
        },
        {
            id: "2",
            name: "Assigned",
            desc: "설명2",
            type: "진행",
        },
        {
            id: "3",
            name: "중간2",
            desc: "설명3",
            type: "진행",
        },
        {
            id: "4",
            name: "Closed",
            desc: "종료 상태",
            type: "종료",
        },
        {
            id: "5",
            name: "Deffered",
            desc: "연기 처리",
            type: "종료",
        },
    ]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            desc: "",
            type: "",
        },
    });

    const onDragStart = (event: any, nodeType: string, nodeId: string, nodeName: string, nodeDesc: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("application/nodeId", nodeId);
        event.dataTransfer.setData("application/nodeName", nodeName);
        event.dataTransfer.setData("application/nodeDesc", nodeDesc);
        event.dataTransfer.effectAllowed = "move";
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        leftItem.push({ ...values, id: generateRandomId() });
        form.reset();
        setOpen(false);
        console.log(values);
    }

    return (
        <>
            <aside className="relative">
                <div className="description">List</div>
                {leftItem.length > 0 &&
                    leftItem.map((li, i) => {
                        let prop = "";
                        let propClass = "";
                        let color = li.color;
                        let desc = li.desc;

                        if (li.type === "시작") {
                            prop = "input";
                            propClass = "dndnode input";
                        } else if (li.type === "종료") {
                            prop = "output";
                            propClass = "dndnode output";
                        } else {
                            prop = "default";
                            propClass = "dndnode";
                        }

                        return (
                            <div
                                id={li.id}
                                key={li.id}
                                className={propClass}
                                onDragStart={(event) =>
                                    onDragStart(
                                        event,
                                        prop,
                                        event.currentTarget.id,
                                        event.currentTarget.innerText,
                                        desc
                                    )
                                }
                                draggable
                            >
                                {li.name}
                            </div>
                        );
                    })}
                <Button className="absolute bottom-3" variant="outline" onClick={() => setOpen(true)}>
                    ADD
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>상태 추가</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Name</FormLabel>
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
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Type</FormLabel>
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
                                    control={form.control}
                                    name="desc"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Desc</FormLabel>
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

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Close
                                        </Button>
                                    </DialogClose>

                                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                                        Submit
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Form>
                </Dialog>
            </aside>
        </>
    );
};
