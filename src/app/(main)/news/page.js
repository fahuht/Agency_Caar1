/* eslint-disable @next/next/no-img-element */

'use client'

import React, { useEffect, useState } from 'react';
import "./page.css";
import dayjs from 'dayjs';
import { baseApi } from '@/utils/constants';
import { dataNews } from './constants';

const News = () =>{
    
    const [searchValue, setSearchValue] = useState("")
 
    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(()=>{
        alert(`Độ dài của input search là ${searchValue?.length}`) 
    },[searchValue])


    const handleSearch = () => {
        alert(`http://localhost:3000/tin-tuc/tim-kiem?keyword=${searchValue}&type=tu-khoa&page=0`)
    }


    return (    
        <div className='container'>
            <div className='px-7 xl:px-32 pb-5 mx-auto bg-white'>
                {/* <nav className='bg-grey-light w-full rouded-md hidden md:block pt-5'>
                        <ol className='list-reset flex'>
                        <Breadcrumb separator=">" 
                            items={[
                            {
                                title: 'Trang chủ',
                            },
                            {
                                title: 'Tin  tức',
                            },
                            ]}
                        />
                        </ol>
                </nav> */}

                <div className='py-3 md:py-6'>
                        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mt-3 lg:mt-0">
                            Tin tức - Thị trường
                        </h1>
                        <div className='flex justify-between mt-3'>
                            <p className='xl:w-1/3'>Cổng thông tin hàng đầu với hàng nghìn tin tức thị trường, dự báo xu
                                hướng, số liệu báo cáo phân tích thị trường bất động sản.
                            </p>
                            <div className='w-1/4 hidden lg:block'>
                                <div>
                                    <form>
                                        <div className='relative'>
                                            <input 
                                            placeholder='Tìm kiếm tin tức' 
                                            type='text' 
                                            className='custom-search'
                                            onChange={(e)=> handleChange(e)}
                                            ></input>
                                            <button onClick={()=> handleSearch()}>
                                                <i className='fa-solid fa-magnifying-glass custom-icon-search'>
                                                </i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            {/* main2 */}
            <div className='main2'>
            <div className='pt-5 border-t-2 lg:flex flex-row'>
                <div className='news-content-left lg:pr-6 lg:basis-3/5 lg:border-r-2'>
                    <div className='relative rounded-xl overflow-hidden'>
                        <a href='http://localhost:3000/tin-tic/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e09'>
                            <img src='http://10.100.30.35:9075/file-service/api/v1/images/download/4a42a4bf-fe5a-40d4-ba37-8833ef57d0ac' alt='Ảnh spotlight tin tức' className='image-spotlight'>
                            </img>
                        </a>
                        <div className='title-news-spotlight custom-news-spotlight'>
                            <p className='font-bold text-xs md:text-sm'>
                                <span className='mr-3'>24/05/2023</span>
                                Tin thị trường
                            </p>
                            <a className='url-title-spotlight' href='http://localhost:3000/tin-tic/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e09'>
                                Bất động sản 2023: 'Cuộc chơi' của những nhà đầu tư có tầm nhìn dài hạn
                            </a>
                        </div>
                    </div>
                </div>

                <div className='news-content-right lg:basis-2/5 lg:pl-6 '>
                    <div className>
                        <div className='flex flex-row pt-4 lg:pt-0 xl:pt-1'>
                            <div className='basis-2/5 lg:basis-1/4'>
                                <a href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    <img src='http://10.100.30.35:9075/file-service/api/v1/images/download/4a42a4bf-fe5a-40d4-ba37-8833ef57d0ac' alt='Ảnh sportlight tin tức' className='image-spotlight w-full object-cover object-center rounded-xl aspect-4/3'>

                                    </img>
                                </a>
                            </div>

                            <div className='pl-3 lg:pl-5 pt-2 md:pt-5 lg:pt-0 xl:pt-3 basis-3/5 lg:basis-3/4'>
                                <p className='font-bold text-xs lg:text-sm text-zinc-400'>
                                    <span className='mr-3'>24/05/2023</span>
                                    Tin thị trường
                                </p>
                                <a className='url-news-spotlight' href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    Bất động sản 2023: 'Cuộc chơi' của những nhà đầu tư có tầm nhìn dài hạn
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-row pt-4 lg:pt-0 xl:pt-1'>
                            <div className='basis-2/5 lg:basis-1/4'>
                                <a href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    <img src='http://10.100.30.35:9075/file-service/api/v1/images/download/4a42a4bf-fe5a-40d4-ba37-8833ef57d0ac' alt='Ảnh sportlight tin tức' className='image-spotlight w-full object-cover object-center rounded-xl aspect-4/3'>

                                    </img>
                                </a>
                            </div>

                            <div className='pl-3 lg:pl-5 pt-2 md:pt-5 lg:pt-0 xl:pt-3 basis-3/5 lg:basis-3/4'>
                                <p className='font-bold text-xs lg:text-sm text-zinc-400'>
                                    <span className='mr-3'>24/05/2023</span>
                                    Tin thị trường
                                </p>
                                <a className='url-news-spotlight' href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    Bất động sản 2023: 'Cuộc chơi' của những nhà đầu tư có tầm nhìn dài hạn
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-row pt-4 lg:pt-0 xl:pt-1'>
                            <div className='basis-2/5 lg:basis-1/4'>
                                <a href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    <img src='http://10.100.30.35:9075/file-service/api/v1/images/download/4a42a4bf-fe5a-40d4-ba37-8833ef57d0ac' alt='Ảnh sportlight tin tức' className='image-spotlight w-full object-cover object-center rounded-xl aspect-4/3'>

                                    </img>
                                </a>
                            </div>

                            <div className='pl-3 lg:pl-5 pt-2 md:pt-5 lg:pt-0 xl:pt-3 basis-3/5 lg:basis-3/4'>
                                <p className='font-bold text-xs lg:text-sm text-zinc-400'>
                                    <span className='mr-3'>24/05/2023</span>
                                    Tin thị trường
                                </p>
                                <a className='url-news-spotlight' href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    Bất động sản 2023: 'Cuộc chơi' của những nhà đầu tư có tầm nhìn dài hạn
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-row pt-4 lg:pt-0 xl:pt-1'>
                            <div className='basis-2/5 lg:basis-1/4'>
                                <a href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    <img src='http://10.100.30.35:9075/file-service/api/v1/images/download/4a42a4bf-fe5a-40d4-ba37-8833ef57d0ac' alt='Ảnh sportlight tin tức' className='image-spotlight w-full object-cover object-center rounded-xl aspect-4/3'>

                                    </img>
                                </a>
                            </div>

                            <div className='pl-3 lg:pl-5 pt-2 md:pt-5 lg:pt-0 xl:pt-3 basis-3/5 lg:basis-3/4'>
                                <p className='font-bold text-xs lg:text-sm text-zinc-400'>
                                    <span className='mr-3'>24/05/2023</span>
                                    Tin thị trường
                                </p>
                                <a className='url-news-spotlight' href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    Bất động sản 2023: 'Cuộc chơi' của những nhà đầu tư có tầm nhìn dài hạn
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-row pt-4 lg:pt-0 xl:pt-1'>
                            <div className='basis-2/5 lg:basis-1/4'>
                                <a href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    <img src='http://10.100.30.35:9075/file-service/api/v1/images/download/4a42a4bf-fe5a-40d4-ba37-8833ef57d0ac' alt='Ảnh sportlight tin tức' className='image-spotlight w-full object-cover object-center rounded-xl aspect-4/3'>

                                    </img>
                                </a>
                            </div>

                            <div className='pl-3 lg:pl-5 pt-2 md:pt-5 lg:pt-0 xl:pt-3 basis-3/5 lg:basis-3/4'>
                                <p className='font-bold text-xs lg:text-sm text-zinc-400'>
                                    <span className='mr-3'>24/05/2023</span>
                                    Tin thị trường
                                </p>
                                <a className='url-news-spotlight' href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    Bất động sản 2023: 'Cuộc chơi' của những nhà đầu tư có tầm nhìn dài hạn
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-row pt-4 lg:pt-0 xl:pt-1'>
                            <div className='basis-2/5 lg:basis-1/4'>
                                <a href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    <img src='http://10.100.30.35:9075/file-service/api/v1/images/download/4a42a4bf-fe5a-40d4-ba37-8833ef57d0ac' alt='Ảnh sportlight tin tức' className='image-spotlight w-full object-cover object-center rounded-xl aspect-4/3'>

                                    </img>
                                </a>
                            </div>

                            <div className='pl-3 lg:pl-5 pt-2 md:pt-5 lg:pt-0 xl:pt-3 basis-3/5 lg:basis-3/4'>
                                <p className='font-bold text-xs lg:text-sm text-zinc-400'>
                                    <span className='mr-3'>24/05/2023</span>
                                    Tin thị trường
                                </p>
                                <a className='url-news-spotlight' href='http://localhost:3000/tin-tuc/tin-thi-truong-bat-dong-san-2023-cuoc-choi-cua-nhung-nha-dau-tu-co-tam-nhin-dai-han-id=5dac8e12-dbb2-4bbb-8e94-d14783730e03'>
                                    Bất động sản 2023: 'Cuộc chơi' của những nhà đầu tư có tầm nhìn dài hạn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* main3 */}
            <div className='main4'>
                <div className='border-b-2 mb-2 mt-9'>
                    <div className='flex justify-between pb-2'>
                        <h1 className='font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl'>Tin thị trường</h1>
                        <a className='text-base text-orange-600 hover:border-b-0 self-end' href='http://localhost:3000/tin-tuc/tim-kiem?type=tin-thi-truong&page=0'>Xem tất cả</a>
                    </div>
                </div>
                <div className=' pt-2' >
                        <div className='flex items-strech overflow-x-auto flex-nowrap mb-3' style={{overflowX: 'auto'}} >
                        {dataNews.map((item)=>(
                            <div key={item.id} className='item-new-flex w-3/4 md:w-1/2 lg:w-1/4 pr-4'>
                                <a href={item.slug}>
                                    <img src={`${baseApi}/file-service/api/v1/images/download/${item.imageId}`} alt={item.shortDescription} className='rounded-xl aspect-4/3'>
                                    
                                    </img>
                                    <p className='font-bold mt-2 text-xs lg:text-sm text-zinc-400 '>{dayjs(item.postDate).format('DD/MM/YYYY')}</p>
                                    <p className='font-bold mt-2 text-sm lg:text-base text-slate-700 '>
                                        {item.title}
                                    </p>
                                </a>
                            </div>
                        ))} 
                        </div>
                </div>

            </div>


            {/* main4 */}
            <div className='main4'>
                <div className='border-b-2 mb-2 mt-9'>
                    <div className='flex justify-between pb-2'>
                        <h1 className='font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl'>Phân tích - dự báo</h1>
                        <a className='text-base text-orange-600 hover:border-b-0 self-end' href='http://localhost:3000/tin-tuc/tim-kiem?type=tin-thi-truong&page=0'>Xem tất cả</a>
                    </div>
                </div>
                <div className=' pt-2' >
                    <div className='flex items-strech overflow-x-auto flex-nowrap mb-3' style={{overflowX: 'auto'}} >
                        {dataNews.map((item)=>(
                            <div key={item.id} className='item-new-flex w-3/4 md:w-1/2 lg:w-1/4 pr-4'>
                                <a href={item.slug}>
                                    <img src={`${baseApi}/file-service/api/v1/images/download/${item.imageId}`} alt={item.shortDescription} className='rounded-xl aspect-4/3'>
                                    
                                    </img>
                                    <p className='font-bold mt-2 text-xs lg:text-sm text-zinc-400 '>{dayjs(item.postDate).format('DD/MM/YYYY')}</p>
                                    <p className='font-bold mt-2 text-sm lg:text-base text-slate-700 '>
                                        {item.title}
                                    </p>
                                </a>
                            </div>
                        ))} 
                    </div>
                </div>

            </div>
            
        </div>
    );




}


export default News