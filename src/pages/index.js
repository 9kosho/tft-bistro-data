import React from "react";
import path from "path";
import fs from "fs";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
    const jsonString = JSON.stringify(data, null, 2);

    return (
        <main>
            <pre>{jsonString}</pre>
        </main>
    );
}

export async function getStaticProps() {
    const directoryPath = path.join(process.cwd(), "public", "json");
    const filenames = fs.readdirSync(directoryPath);

    let combinedData = [];

    filenames
        .filter((filename) => /\.json$/.test(filename))
        .forEach((filename) => {
            const filePath = path.join(directoryPath, filename);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const jsonData = JSON.parse(fileContents);

            // Merge the data arrays from each file into combinedData
            if (Array.isArray(jsonData)) {
                combinedData = combinedData.concat(jsonData);
            } else {
                combinedData.push(jsonData);
            }
        });

    return {
        props: {
            data: combinedData,
        },
    };
}
