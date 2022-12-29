import React, { useEffect, useState } from 'react'
import "./index.scss"
import MenuCard from '../../components/MenuCard'
import { menuApiSlice, useMenusQuery, usePromotionsQuery } from '../../features/menuSlice/menuApiSlice'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilterQuery, setFilterQuery } from '../../features/menuSlice'
import RadioButton from '../../components/RadioButton'
import { apiSlices } from '../../app/api/apiSlice'
import PromotionCard from '../../components/PromotionCard'

const Menu = (): JSX.Element => {
    const hero1 = "https://res.cloudinary.com/dgr6o89ym/image/upload/c_scale,h_1080,w_1920/v1672109205/sources/wallpaperflare.com_wallpaper_wtqler.jpg"
    const hero2 = "https://res.cloudinary.com/dgr6o89ym/image/upload/c_scale,h_1080,w_1920/v1672122757/sources/wallpaperflare.com_wallpaper_1_nekcbo.jpg"
    const hero3 = "https://res.cloudinary.com/dgr6o89ym/image/upload/c_scale,h_1080,w_1920/v1672122755/sources/wallpaperflare.com_wallpaper_2_vhqq27.jpg"


    const dispatch = useDispatch()
    const filterQuery = useSelector(selectFilterQuery)
    const { data: menu, isLoading: isMenuLoading } = useMenusQuery(filterQuery)
    const { data: promotion, isError: isPromotionError, isLoading: isPromotionLoading } = usePromotionsQuery()
    
    const handleFilter = ((e: any) => {
        const newFilterQuery = {...filterQuery}
        newFilterQuery.filterByCategory = e.target.value
        dispatch(setFilterQuery(newFilterQuery))
    })

    const handleHidingNavOnScroll = (e: any) => {
        console.log('scrollTop: ', e.currentTarget.scrollTop);
        console.log('offsetHeight: ', e.currentTarget.offsetHeight);
    }

    const content = (
        <div className='main' onScroll={handleHidingNavOnScroll}>
            <section className="hero">
                <div id="menuHeroCarousel" className="carousel slide" data-bs-ride="carousel" data-interval="3000" data-bs-touch="false">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={hero1} className="d-block w-100" alt="slide 1"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Fine sushi dining in one-click away</h5>
                            <p>Experience your favorite japanese meals at its finest.</p>
                        </div>
                        </div>
                        <div className="carousel-item">
                        <img src={hero2} className="d-block w-100" alt="slide 2"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                        </div>
                        <div className="carousel-item">
                        <img src={hero3} className="d-block w-100" alt="slide 3"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            
            { 
                !isPromotionError 
                && <section className="promotion">
                    
                    <h2>Special for you!</h2>
                    <div className="container">
                        <div className="row menu-container">
                            {
                                !isPromotionLoading && promotion 
                                ?  promotion.data.promotions.map((val, i) => {
                                    return (
                                        <div key={i} className="col-lg-6 mt-1 mb-1 menu-item">
                                            <PromotionCard
                                                    menuName= {val.Name}
                                                    description= {val.Description}
                                                    promotionPhoto= {val.PromotionPhoto}
                                                    discountRate= {val.DiscountRate}
                                                    startAt= {val.StartAt}
                                                    expiredAt= {val.ExpiredAt}
                                                    promotionMenus={val.PromoMenus}
                                            />
                                        </div>
                                    )
                                })
                                :<Loader/>
                            }
                        </div>
                    </div>
                </section>
            }
            <br/>
            <section className="menu">
                <h2>Our specialties!</h2>
                <div className="container">
                    <div className="row">
                        <div className="menu-filter col-12 d-flex gap-3 mb-3 justify-content-center">
                            <RadioButton 
                                groupName='menu-filter' 
                                text='All Menu' 
                                value='appetizers,meals,drinks'
                                onChange={handleFilter}
                                default={true}
                            />
                            <RadioButton 
                                groupName='menu-filter' 
                                text='Appetizers' 
                                value='appetizers'
                                onChange={handleFilter}
                            />
                            <RadioButton 
                                groupName='menu-filter' 
                                text='meals' 
                                value='meals'
                                onChange={handleFilter}
                            />
                            <RadioButton 
                                groupName='menu-filter' 
                                text='drinks' 
                                value='drinks'
                                onChange={handleFilter}
                            />
                        </div>
                    </div>
                    <div className="row menu-container">
                        {
                            !isMenuLoading && menu 
                            ?  menu.data.menus.map((val, i) => {
                                return (
                                    <div key={i} className="col-lg-3 mt-1 mb-1 menu-item">
                                        <MenuCard
                                            menuName={val.MenuName}
                                            avgRating={val.AvgRating}
                                            numberOfFavorites={val.NumberOfFavorites}
                                            price={val.Price}
                                            menuPhoto={val.MenuPhoto}
                                            categoryId={val.CategoryId}
                                        />
                                    </div>
                                )
                            })
                            :<Loader/>
                        }
                    </div>
                </div>
                

            </section>
        </div>
    )

    return content
}

export default Menu