import { Image, ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../Components/Categories";
import axios from "axios";
import Recipes from "../Components/Recipes";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data && response.data.categories) {
        console.log({ total: response.data.categories.length });
        setCategories(response.data.categories);
        setActiveCategory(response.data.categories[0].strCategory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRecipes = async () => {
    try {
      console.log({ activeCategory });
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + activeCategory
      );
      console.log("calling API: GET RECIPE Start", new Date());
      if (response && response.data && response.data.meals) {
        console.log({ recipesLen: response.data.meals.length });
        setMeals(response.data.meals);
        console.log("calling API: GET RECIPE Completed", new Date());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    activeCategory && getRecipes();
  }, [activeCategory]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    setMeals([]);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
        className="space-y-6 pt-14"
      >
        {/* Avatar & Bell Icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greeting & punch line */}
        <View className="mx-4 space-y-2 mb-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(1.7) }}>
            Hello, Sanjeev
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Make your own food,
            </Text>
          </View>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Stay at <Text className="text-amber-400">home</Text>
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* Categories*/}
        <View>
          {categories.length > 0 && (
            <Categories
              activeCategory={activeCategory}
              categories={categories}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes*/}
        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
      </ScrollView>
    </View>
  );
}
