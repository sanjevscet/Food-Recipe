import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import {
  ChevronLeftIcon,
  ClockIcon,
  UsersIcon,
  FireIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

import axios from "axios";
import Loading from "../Components/Loading";

export default function RecipeDetail() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const item = route.params;

  const navigation = useNavigation();
  const mealId = item.idMeal;
  console.log({ mealId });

  // console.log({ item });
  // console.log(item.strMealThumb);

  const getMeal = async (mealId) => {
    setLoading(true);
    console.log({ mealId });
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId
      );
      console.log("calling API: GET Meal Start", new Date());
      if (response && response.data && response.data.meals) {
        setMeal(response.data.meals[0]);
        console.log("calling API: GET Meal Completed", new Date());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeal(mealId);
  }, [mealId]);

  const ingredientIndexes = (meal) => {
    console.log({ meal });
    if (!meal) {
      return [];
    }
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    console.log({ indexes });
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }

    return null;
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="auto" />

      {/* Recipe Image */}
      <View className="flex-row justify-center">
        <Animated.Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: widthPercentageToDP(98),
            height: heightPercentageToDP(50),
            borderRadius: 53,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            marginBottom: 20,
          }}
          sharedTransitionTag={item.strMeal}
        />
      </View>
      {/* Back & Like Button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14"
      >
        <TouchableOpacity className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon
            size={heightPercentageToDP(3.5)}
            strokeWidth={4.5}
            color="#fbbf24"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            size={heightPercentageToDP(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/*  meal Description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 justify-between space-y-4 pt-8">
          {/* name & area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: heightPercentageToDP(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: heightPercentageToDP(3) }}
              className="font-semibold flex-1 text-neutral-500"
            >
              {meal?.strArea}
            </Text>
          </Animated.View>
          {/* misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(700)
              .springify()
              .damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: heightPercentageToDP(6.5),
                  width: heightPercentageToDP(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon
                  size={heightPercentageToDP(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: heightPercentageToDP(2) }}
                  className="font-bold  text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: heightPercentageToDP(1.3) }}
                  className="font-bold  text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: heightPercentageToDP(6.5),
                  width: heightPercentageToDP(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon
                  size={heightPercentageToDP(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: heightPercentageToDP(2) }}
                  className="font-bold  text-neutral-700"
                >
                  05
                </Text>
                <Text
                  style={{ fontSize: heightPercentageToDP(1.3) }}
                  className="font-bold  text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: heightPercentageToDP(6.5),
                  width: heightPercentageToDP(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon
                  size={heightPercentageToDP(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: heightPercentageToDP(2) }}
                  className="font-bold  text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: heightPercentageToDP(1.3) }}
                  className="font-bold  text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{
                  height: heightPercentageToDP(6.5),
                  width: heightPercentageToDP(6.5),
                }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={heightPercentageToDP(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: heightPercentageToDP(2) }}
                  className="font-bold  text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: heightPercentageToDP(1.3) }}
                  className="font-bold  text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: heightPercentageToDP(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{
                        height: heightPercentageToDP(1.5),
                        width: heightPercentageToDP(1.5),
                      }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: heightPercentageToDP(1.7) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        className="font-medium text-neutral-600"
                        style={{ fontSize: heightPercentageToDP(1.7) }}
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: heightPercentageToDP(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text
              style={{ fontSize: heightPercentageToDP(1.6) }}
              className="text-neutral-600"
            >
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {/* Recipe Video */}
          {meal?.strYoutube ? (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: heightPercentageToDP(2.5) }}
                className="font-bold text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                <YouTubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={heightPercentageToDP(30)}
                />
              </View>
            </Animated.View>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}
