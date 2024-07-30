"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetProjectsQuery } from "@/features/demo/redux/projectApi";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { columns } from "./colums";
import { DataTable } from "@/components/ui/data-table-using";

const formSchema = z.object({
    project_no: z.string().min(6).max(50),
    project_name: z.string().min(1).max(50),
    startDte: z.string().min(1),
    endDte: z.string().min(1),
    status: z.string().min(1),
});

const DemoNewPage = () => {
    const { data: rtkData, isLoading, error } = useGetProjectsQuery({ del_yn: "N", page_startnum: 1, page_endnum: 10 });
    const [date, setDate] = React.useState<Date>();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const rows = 10;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            project_no: "",
            project_name: "",
        },
    });

    const segment = usePathname();

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <div className="container mx-auto py-10">
            <div className="text-right">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">신규 등록</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>프로젝트 등록</DialogTitle>
                            <DialogDescription>프로젝트를 생성하는 ...</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="project_no"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">프로젝트 No.</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} className="col-span-3" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="project_name"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">프로젝트명</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="프로젝트 No를 입력하세요"
                                                    {...field}
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="startDte"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">시작일</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[280px] justify-start text-left font-normal",
                                                                !date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endDte"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">종료일</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} className="col-span-3" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
            <>
                {/* {rtkData && ( */}
                <DataTable
                    columns={columns}
                    data={rtkData?.list as any}
                    loading={isLoading}
                    onSelectionChange={setSelectedRows}
                />
                {/* )} */}
                <div>{segment}</div>
                <div>
                    {/* rowSelection 상태를 여기서 사용할 수 있음 */}
                    <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
                </div>
            </>
        </div>
    );
};

export default DemoNewPage;
