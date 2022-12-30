export interface IMenu {
    id: number;
    menu_name: string;
	avg_rating: number;
	number_of_favorites: number;
	price: number;
	menu_photo: string;
	category_id: number
}

export interface IMenuLists {
    menus: IMenu[];
    current_page: number;
    max_page: number;
}

export interface IMenuQuery {
	search: string;
	sort: string;
	sortBy: string;
	filterByCategory: string;
	limit: number;
	page: number;

}

export interface IPromotion {
    id: number;
    admin_id: number;
	name: string;
	description: string;
	promotion_photo: string;
	discount_rate: number;
	start_at: Date;
	expired_at: Date;
	promo_menus: [
		{
			id: number;
			promotion_id: number;
			menu_id: number;
			menu: {
				id: number;
				menu_name: string;
				avg_rating: number;
				number_of_favorites: number;
				price: number;
				menu_photo: string;
				category_id: number;
			}
			promotion_price: number;
		}
	]
}


export interface IPromotionLists {
    promotions: IPromotion[];
}