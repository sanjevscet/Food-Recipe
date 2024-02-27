import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

import { mealData } from "../Constants";
import Loading from "./Loading";

export default function Recipes({ categories, meals }) {
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: heightPercentageToDP(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard index={i} item={item} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(20)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          className="bg-black/5"
          style={{
            width: "100%",
            height:
              index % 3 === 0
                ? heightPercentageToDP(25)
                : heightPercentageToDP(35),
            borderRadius: 35,
          }}
        />
        <Image
          source={{ uri: item.strMealThumb }}
          className="bg-black/5"
          style={{
            width: "100%",
            height:
              index % 3 === 0
                ? heightPercentageToDP(25)
                : heightPercentageToDP(35),
            borderRadius: 35,
          }}
        />
        <Text
          style={{ fontSize: heightPercentageToDP(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
