"use client";
import React from "react";
import { ProductService } from "../_service/ProductService";
import ArrayToTree from "@/common/utils/ArrayToTree";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DemoNewPage = () => {
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        ProductService.getProductsMini().then((data) => setProducts(data as any));
    }, []);

    const [value, setValue] = React.useState<string[]>([]);

    const options = [
        { label: "React", value: "react" },
        { label: "Vue", value: "vue" },
        { label: "Svelte", value: "svelte" },
    ];

    return (
        <div className="flex gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>Before Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre>{JSON.stringify(products, null, 2)}</pre>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>After Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre>{JSON.stringify(ArrayToTree(products), null, 2)}</pre>
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </div>
    );
};
export default DemoNewPage;
