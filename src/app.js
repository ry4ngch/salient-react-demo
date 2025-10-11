import React, {Component} from 'react';
import {createRoot} from 'react-dom/client'
import 'normalize.css/normalize.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import Bootstrap styles
import './styles/custom-bootstrap.scss';

// import fontawesome styles
import './utils/FontAwesome/fontAwesome';

// import personal styles
import './styles/styles.scss';

// import pages & layouts
import Root from './layout/Root';
import ErrorPage from './pages/Error';
import Dashboard from './pages/Dashboard';
import TablesDemo from './pages/TablesDemo';
import CardsDemo from './pages/CardsDemo';
import BreadcrumbsDemo from './pages/BreadcrumbsDemo';
import ListDemo from './pages/ListDemo';
import TimelineDemo from './pages/TimelineDemo';
import TabsDemo from './pages/TabsDemo';
import AccordianDemo from './pages/AccordianDemo';
import TreeviewDemo from './pages/TreeviewDemo';
import ButtonsDemo from './pages/ButtonsDemo';
import FormUIsDemo from './pages/FormUIDemo';
import ModalDemo from './pages/ModalDemo';
import BadgesDemo from './pages/BadgesDemo';
import BannersDemo from './pages/BannersDemo';
import SidebarDemo from './pages/SidebarDemo';
import ProgressDemo from './pages/ProgressDemo';
import Table2 from './components/TestTables/Table2';

// import Navigate Provider context
import { AppProvider } from './store/navigate-context';

// import jQuery
import 'jquery';

const root = createRoot(document.getElementById('app'));

const router = createBrowserRouter([
	{
		path: '/', 
		element: <Root/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				index: true, //when path is '/'
				element: <Dashboard/>
			}, 
			{
				path: '/tables',
				element: <TablesDemo/>
			},
			{
				path: '/cards',
				element: <CardsDemo/>
			},
			{
				path: '/breadcrumbs',
				element: <BreadcrumbsDemo/>
			},
			{
				path: '/list',
				element: <ListDemo/>
			},
			{
				path: '/timeline',
				element: <TimelineDemo/>
			},
			{
				path: '/tabs',
				element: <TabsDemo/>
			},
			{
				path: '/accordian',
				element: <AccordianDemo/>
			},
			{
				path: '/treeview',
				element: <TreeviewDemo/>
			},
			{
				path: '/buttons',
				element: <ButtonsDemo/>
			},
			{
				path: '/formUIs',
				element: <FormUIsDemo/>
			},
			{
				path: '/modal',
				element: <ModalDemo/>
			},
			{
				path: '/badges',
				element: <BadgesDemo/>
			},
			{
				path: '/banners',
				element: <BannersDemo/>
			},
			{
				path: '/sidebar',
				element: <SidebarDemo/>
			},
			{
				path: '/progress',
				element: <ProgressDemo/>
			},

		]
	}
])

class App extends Component {
    render(){

		console.log('jQuery version', $.fn.jquery);
		return (
			<RouterProvider router={router}/>
		)
		
    }
}

root.render(
	<AppProvider>
		<App/>
	</AppProvider>
);