const accordianData = [
    {
        title: 'Title 1',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius iste vel tempore. Officiis officia illum ut magnam reprehenderit voluptas!'
    },
    {
        title: 'Title 2',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius iste vel tempore. Officiis officia illum ut magnam reprehenderit voluptas!'
    },
    {
        title: 'Title 3',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam dolores, nam nesciunt odio ipsam accusantium, nemo asperiores a sint consequuntur aspernatur quis atque ipsa, adipisci saepe numquam unde nobis deleniti fuga rerum doloremque. In minima deserunt repellat odio corrupti consectetur! Error ea officiis a veniam, iusto iure odit architecto laudantium, eveniet voluptates impedit. Doloribus ea quis pariatur alias rem asperiores hic ex reiciendis veniam, neque repudiandae impedit soluta dicta beatae quo ratione porro sequi aut illum. Voluptatum ex, porro inventore adipisci amet deserunt temporibus enim delectus corrupti odio modi reprehenderit doloremque eos minima autem molestias nemo, aspernatur earum quam incidunt.'
    },
    {
        title: 'Title 4',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius iste vel tempore. Officiis officia illum ut magnam reprehenderit voluptas!'
    },
    {
        title: 'Title 5',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eius iste vel tempore. Officiis officia illum ut magnam reprehenderit voluptas!'
    },
]
  
const tabsData = [
    {
        id: 'tab1',
        title: 'Tab 1',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, placeat! Consequuntur, cumque. Odio laboriosam commodi repellat adipisci quaerat itaque molestiae.'
    },
    {
        id: 'tab2',
        title: 'Tab 2',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, atque.'
    },
    {
        id: 'tab3',
        title: 'Tab 3',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae labore asperiores minus quis aliquam similique itaque, est praesentium ipsum illo! Minus id ratione rem cum nostrum magnam quasi laborum aliquid.'
    },
    {
        id: 'tab4',
        title: 'Tab 4',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quasi ex provident maiores praesentium. Nemo.'
    }
]

let docs = [
    { "Type": "excel", "Name": "Project Roadmap", "Description": "Timeline for upcoming projects", "Tags": "Planning, Agile", "LastViewed": "2 hours ago", "Expiration": "Mar 15, 2023" },
    { "Type": "word", "Name": "Meeting Minutes", "Description": "Notes from the weekly team meeting", "Tags": "Meetings, Notes", "LastViewed": "1 day ago", "Expiration": "Jan 10, 2023" },
    { "Type": "powerpoint", "Name": "Marketing Strategy", "Description": "Presentation on Q4 marketing strategies", "Tags": "Marketing, Strategy", "LastViewed": "3 days ago", "Expiration": "Oct 12, 2023" },
    { "Type": "excel", "Name": "Budget Forecast", "Description": "Projected budget for next quarter", "Tags": "Finance, Budget", "LastViewed": "4 days ago", "Expiration": "Nov 20, 2023" },
    { "Type": "word", "Name": "Product Specs", "Description": "Specification sheet for new product launch", "Tags": "Product, Design", "LastViewed": "5 days ago", "Expiration": "Dec 05, 2023" },
    { "Type": "powerpoint", "Name": "Sales Report", "Description": "Summary of last month's sales data", "Tags": "Sales, Report", "LastViewed": "6 days ago", "Expiration": "Aug 30, 2023" },
    { "Type": "excel", "Name": "Task List", "Description": "Detailed task list for the new sprint", "Tags": "Tasks, Agile", "LastViewed": "a week ago", "Expiration": "May 14, 2023" },
    { "Type": "word", "Name": "Event Itinerary", "Description": "Schedule for upcoming company retreat", "Tags": "Events, Travel", "LastViewed": "2 weeks ago", "Expiration": "Jul 04, 2023" },
    { "Type": "powerpoint", "Name": "Company Overview", "Description": "Corporate presentation for stakeholders", "Tags": "Company, Overview", "LastViewed": "3 weeks ago", "Expiration": "Sep 25, 2023" },
    { "Type": "excel", "Name": "Resource Allocation", "Description": "Team resource planning", "Tags": "Planning, Resources", "LastViewed": "a month ago", "Expiration": "Apr 10, 2023" },
    { "Type": "word", "Name": "Policy Update", "Description": "Latest company policies and updates", "Tags": "HR, Policies", "LastViewed": "a month ago", "Expiration": "Jun 20, 2023" },
    { "Type": "powerpoint", "Name": "Training Deck", "Description": "Slides for employee training", "Tags": "Training, HR", "LastViewed": "2 months ago", "Expiration": "Feb 17, 2023" },
    { "Type": "excel", "Name": "KPI Analysis", "Description": "Performance indicators for Q2", "Tags": "KPI, Performance", "LastViewed": "2 months ago", "Expiration": "Mar 30, 2023" },
    { "Type": "word", "Name": "Client List", "Description": "Updated client directory", "Tags": "Clients, Directory", "LastViewed": "3 months ago", "Expiration": "May 22, 2023" },
    { "Type": "powerpoint", "Name": "Product Demo", "Description": "Demo slides for new software release", "Tags": "Product, Demo", "LastViewed": "3 months ago", "Expiration": "Jan 11, 2023" },
    { "Type": "excel", "Name": "Inventory Check", "Description": "Stock check for warehouse", "Tags": "Inventory, Stock", "LastViewed": "4 months ago", "Expiration": "Jul 09, 2023" },
    { "Type": "word", "Name": "Contract Draft", "Description": "Draft for new vendor contract", "Tags": "Legal, Contracts", "LastViewed": "4 months ago", "Expiration": "Apr 18, 2023" },
    { "Type": "powerpoint", "Name": "Investor Pitch", "Description": "Presentation for potential investors", "Tags": "Finance, Investors", "LastViewed": "5 months ago", "Expiration": "Oct 05, 2023" },
    { "Type": "excel", "Name": "Expense Report", "Description": "Record of company expenses", "Tags": "Finance, Expenses", "LastViewed": "5 months ago", "Expiration": "Dec 28, 2023" },
    { "Type": "word", "Name": "Staff Roster", "Description": "Weekly staff schedule", "Tags": "HR, Schedule", "LastViewed": "6 months ago", "Expiration": "Jun 15, 2023" },
    { "Type": "powerpoint", "Name": "Annual Review", "Description": "Company performance review for the year", "Tags": "Review, Annual", "LastViewed": "6 months ago", "Expiration": "Aug 19, 2023" }
];

export {accordianData, tabsData, docs}
  
  