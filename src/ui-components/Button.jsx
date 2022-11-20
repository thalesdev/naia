/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon, Text, View } from "@aws-amplify/ui-react";
export default function Button(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="208.52px"
      height="44.31px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Button")}
    >
      <Icon
        width="208.52px"
        height="44.31px"
        viewBox={{
          minX: 0,
          minY: 0,
          width: 208.5198974609375,
          height: 44.30987548828125,
        }}
        paths={[
          {
            d: "M0 10C0 4.47716 4.47715 0 10 0L198.52 0C204.043 0 208.52 4.47715 208.52 10L208.52 34.3098C208.52 39.8327 204.043 44.3099 198.52 44.3099L9.99999 44.3099C4.47714 44.3099 0 39.8327 0 34.3099L0 10Z",
            fill: "rgba(35,63,178,1)",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        {...getOverrideProps(overrides, "Rectangle 27")}
      ></Icon>
      <Text
        fontFamily="Montserrat"
        fontSize="18px"
        fontWeight="600"
        color="rgba(255,255,255,1)"
        lineHeight="27.900001525878906px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="180.45px"
        height="21.98px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="20.29%"
        bottom="30.09%"
        left="6.41%"
        right="7.05%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Iniciar"
        {...getOverrideProps(overrides, "Iniciar")}
      ></Text>
    </View>
  );
}
