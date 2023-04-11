import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

import './Sidebar1.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'csshake/dist/csshake.min.css';
const Sidebar1 = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <h1>
                        <span>BookM</span>
                    </h1>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/home" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="home">Trang chủ</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/getbook" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="magnifying-glass">Tra cứu sách</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/bill" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="file-invoice">Lập hóa đơn</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/ari" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="wallet">Phiếu thu tiền</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/purchaseoder" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="download">Nhập hàng</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/rule" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="person-circle-check">Quy định</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/logout" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="right-from-bracket">Đăng xuất</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        ________________________
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar1;
