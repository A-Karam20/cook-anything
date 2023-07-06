import { Blog } from "./BlogsUI";
import { BlogModel } from "./BlogModel";

const Blogs : BlogModel[] = [
    /*{
        header: "My first update",
        date : "June 21, 2023",
        paragraph : 'Working on the "about us" page',
    },*/
    {
        header: "Application deployed",
        date : "July 6, 2023",
        paragraph : 'App launched on vercel.',
        readMoreParagraph : "After days of work on developing the app, including the front-end, back-end, and database components, I am thrilled to announce that it is now ready for its official launch. Get ready for an exciting journey ahead!",
        link : ""
    },
    {
        header: "Servers deployment canceled",
        date : "July 6, 2023",
        paragraph : 'Back-end server and database server are ready.',
        readMoreParagraph : "The back-end server, developed using the ASP.NET Core, and the MySQL database are fully prepared for deployment. However, due to the expiration of my Azure subscription and the unavailability of alternative options, I am unable to proceed with the deployment. Therefore, I request you to set up your own server and integrate it with the provided front-end.",
        link : ""
    },
    {
        header: "Donations",
        date : "July 6, 2023",
        paragraph : 'Donate money and servers will be deployed.',
        readMoreParagraph : "Just kidding don't waste your money on stupid stuff.",
        link : ""
    },
    {
        header: "Like and Subscribe",
        date : "July 6, 2023",
        paragraph : "Don't forget to like and subscribe to my channel.",
        readMoreParagraph : "The post is already liked automatically, so simply hit the subscribe button to stay updated on the latest developments with the app! There is no subscribe button but you can still check my GitHub repository. Simply click the following link to access it: ",
        link : "https://github.com/A-Karam20/cook-anything.git"
    },
];

export const ShowUpdates = () => {
    return(
        Blogs.map(b => <Blog key={b.header} header={b.header} date={b.date} paragraph={b.paragraph} readMoreParagraph={b.readMoreParagraph} link={b.link} />)
    );
}