"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

const data = [
    {
        key: "sub_project_no",
        label: "서브시스템",
        field: "Select",
        options: [
            { value: "sub1", label: "Sub System 1" },
            { value: "sub2", label: "Sub System 2" },
            { value: "sub3", label: "Sub System 3" },
        ],
    },
    {
        key: "name",
        label: "이름",
        field: "input",
    },
    {
        key: "id",
        label: "ID",
        field: "input",
    },
    {
        key: "start_dt",
        label: "시작일",
        field: "datepicker",
    },
];

const formSchema = z.object({});

const Twopage = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const renderField = (field, options) => {
        switch (field) {
            case "input":
                return Input;
            case "Select":
                return (props, r) => (
                    <Select {...props}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {options &&
                                    options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                );

            case "datepicker":
                return (props) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                disabled={(date) => date < new Date()}
                                onDayClick={field.onChange}
                            />
                        </PopoverContent>
                    </Popover>
                );
            default:
                return Input;
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="p-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {data.map((item) => {
                        const FieldComponent = renderField(item.field, item.options);
                        return (
                            <FormField
                                key={item.key}
                                control={form.control}
                                name={item.key}
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">{item.label}</FormLabel>
                                        <FormControl>
                                            <FieldComponent {...field} className="col-span-3" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default Twopage;
