export interface EquipmentItem {
	name: string;
	type: string;
	url: string;
	notes: string;
	rating?: number | null;
	specifications?: string;
}

export interface PhotonThrowerItem {
	name: string;
	brand: string;
	weight: string;
	lightType: string;
	lumensHigh: string;
	lumensLow: string;
	candelaHigh: string;
	candelaLow: string;
	runTimeHigh: string;
	runTimeLow: string;
	distanceHigh: string;
	distanceLow: string;
	adjustableFocus: boolean;
	replaceableBattery: boolean;
	batteryType: string;
	usbRechargeable: boolean;
	onboardCharging: boolean;
	waterResistance: string;
	price: string;
	url: string;
	notes: string;
	rating?: number | null;
	emitter: string;
}

export interface WishlistItem {
	name: string;
	url: string;
	notes: string;
	price?: string;
}

export interface TimeSaveItem {
	name: string;
	url: string;
	notes: string;
	timeSavedPerDay: string;
}
