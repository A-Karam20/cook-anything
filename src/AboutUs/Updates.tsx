import { Blog } from "./BlogsUI";
import { BlogModel } from "./BlogModel";

const Blogs : BlogModel[] = [
    {
        header: "My first update",
        date : "June 21, 2023",
        paragraph : 'Working on the "about us" page',
    },
    {
        header: "My Second update",
        date : "June 21, 2023",
        paragraph : 'Still Working on the "about us" page',
    },
    {
        header: "My Third update",
        date : "June 21, 2023",
        paragraph : 'Finished working on the "about us" page',
    }
];

export const ShowUpdates = () => {
    return(
        Blogs.map(b => <Blog key={b.header} header={b.header} date={b.date} paragraph={b.paragraph} />)
    );
}