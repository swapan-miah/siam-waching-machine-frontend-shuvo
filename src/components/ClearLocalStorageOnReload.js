"use client";

import { useEffect } from "react";

const ClearLocalStorageOnReload = () => {
	useEffect(() => {
		localStorage.clear();
	}, []);

	return null;
};

export default ClearLocalStorageOnReload;
