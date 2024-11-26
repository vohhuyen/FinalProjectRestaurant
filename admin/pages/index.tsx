import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/index';
import axios from 'axios';
import dayjs from 'dayjs';
import { GET_BOOKINGS_ENDPOINT, GET_TABLES_ENDPOINT, GET_USERS_ENDPOINT } from '@/utils/constants/endpoints';
import { parseCookies } from 'nookies';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

interface User {
  _id: string;
  createdAt: string;
}
interface Booking {
  _id: string;
  status: string;
  table: string;
}
interface Table {
  _id: string;
  name: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalUsersLastWeek, setTotalUsersLastWeek] = useState<number>(0);
  const [totalBooking, setTotalBooking] = useState<number>(0);
  const [tableData, setTableData] = useState<Table[]>([]);
  const [bookingCounts, setBookingCounts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get(GET_USERS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get(GET_BOOKINGS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  };

  // Fetch Tables
  const fetchTables = async () => {
    try {
      const response = await axios.get(GET_TABLES_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching table data:', error);
      return [];
    }
  };

  // Calculate User Stats
  const calculateUserStats = (users: User[]) => {
    const total = users.length;
    const lastWeek = users.filter((user) => {
      const createdAt = dayjs(user.createdAt);
      return createdAt.isAfter(dayjs().subtract(7, 'day'));
    }).length;

    setTotalUsers(total);
    setTotalUsersLastWeek(lastWeek);
  };

  // Calculate Booking Stats
  const calculateBookingStats = (bookings: Booking[]) => {
    const total = bookings.filter(
      (booking) => booking.status === 'waiting' || booking.status === 'confirmed'
    ).length;
    setTotalBooking(total);
  };

  // Calculate Booking Counts for Tables
  const calculateTableBookings = (tables: Table[], bookings: Booking[]) => {
    const counts = tables.map(
      (table) => bookings.filter((booking) => booking.table === table._id).length
    );
    setBookingCounts(counts);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [usersData, bookingsData, tablesData] = await Promise.all([
        fetchUsers(),
        fetchBookings(),
        fetchTables(),
      ]);

      setUsers(usersData);
      setBookings(bookingsData);
      setTableData(tablesData);

      calculateUserStats(usersData);
      calculateBookingStats(bookingsData);
      calculateTableBookings(tablesData, bookingsData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Chart Data
  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(123, 99, 255, 0.2)',
    'rgba(99, 132, 200, 0.2)',
    'rgba(235, 64, 52, 0.2)',
  ];
  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(201, 203, 207, 1)',
    'rgba(123, 99, 255, 1)',
    'rgba(99, 132, 200, 1)',
    'rgba(235, 64, 52, 1)',
  ];
  console.log('Table Data:', tableData);
  console.log('Booking Counts:', bookingCounts);
  
  const data = {
    labels: tableData.map((table) => table.name),
    datasets: [
      {
        label: 'Bookings per Table',
        data: bookingCounts,
        backgroundColor: backgroundColors.slice(0, tableData.length),
        borderColor: borderColors.slice(0, tableData.length),
        borderWidth: 1,
      },
    ],
  };
  console.log('Labels:', tableData.map((table) => table.name));
  console.log('Data:', bookingCounts);
  
  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div>
      <Layout>
        <div className="row inline-block w-[100%]">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="tile_count">
                <div className="x_panel tile_stats_count">
                  <span className="count_top">
                    <i className="fa fa-user"></i> Total Users
                  </span>
                  <div className="count">{totalUsers}</div>
                  <span className="count_bottom">
                    <i className="green">
                      {totalUsers === 0
                        ? 'N/A'
                        : `+${((totalUsersLastWeek / totalUsers) * 100).toFixed(2)}%`}
                    </i>{' '}
                    From last Week
                  </span>
                </div>
                <div className="x_panel tile_stats_count">
                  <span className="count_top">
                    <i className="fa fa-clock-o"></i> Total Booking
                  </span>
                  <div className="count">{totalBooking}</div>
                  <span className="count_bottom">
                    <i className="green">
                      <i className="fa fa-sort-asc"></i>
                    </i>
                  </span>
                </div>
              </div>
              <div className="w-[500px] h-[500px] top-0 ms-[100px]">
                <Pie data={data} options={options} />
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Home;
