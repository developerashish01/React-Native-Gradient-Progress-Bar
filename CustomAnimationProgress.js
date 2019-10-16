
import React from "react";
import { Dimensions, Animated, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");

//const barWidth = width * 0.3454;
//const barHeight = barWidth * 0.093;
const AnimatedRect = Animated.createAnimatedComponent(Rect);
import BaseComponent from '../../containers/BaseComponent';

export default class CustomAnimationProgress extends BaseComponent {

    state = {
        width: new Animated.Value(0),
    };

    rectangleRef = React.createRef();

    componentDidMount() {
        let { percent } = this.props;
        if (percent >= 100)
            percent = 100
        let totalValue = 100
        console.log('componentDidUpdate => ' + totalValue + "==" + percent + "==" + (percent / totalValue))

        this.animate(percent, totalValue);
    }

    componentDidUpdate({ currentValue, totalValue }) {
        this.animate(currentValue, totalValue);
    }

    animate = (current, total) =>
        Animated.timing(this.state.width, {
            toValue: 1,//current / total,
            duration: 1500,
            useNativeDriver: true,
        }).start();

    render() {
        const { width } = this.state;
        const height = this.props.height
        const width1 = this.props.width
        const p = this.props.percent
        const t_percent = p >= 100 ? 100 : p
        const percent = t_percent + "%"//"100%"//children//"50%"
        const fillWidth = (width1 * +t_percent) / 100
        console.log('Progress=>percent=> ', p)
        console.log('Progress=>FillWidth=> ', fillWidth)
        console.log('Progress=>width=> ', width)
        console.log('Progress=>width1=> ', width1)

        return (
            <View style={{
                //margin: 16
            }}>

                <Svg width={width1} height={height}>

                    <Defs>
                        <LinearGradient
                            id={`HeathManaBar-gradient`}
                            rx="8"
                            ry="8"
                            //id="grad" 
                            x1="0"
                            y1="0"
                            x2={fillWidth} >

                            <Stop offset="1" stopColor="#64A8DA" stopOpacity="1" />
                            <Stop offset="1" stopColor="#96C9EF" stopOpacity="0" />
                            <Stop offset="0" stopColor="#305F82" stopOpacity="1" />

                        </LinearGradient>

                    </Defs>

                    <LinearGradient
                        id="grad1" x1="0" y1="0" x2={percent} y2="0">

                        {/* <Stop offset="1" stopColor="#64A8DA" stopOpacity="1" />
                       <Stop offset="1" stopColor="#96C9EF" stopOpacity="0" />
                       <Stop offset="0" stopColor="#305F82" stopOpacity="1" /> */}
                        <Stop offset="1" stopColor="#E1E1E1" stopOpacity="1" />

                        {/* <Stop offset="1" stopColor="#96C9EF" stopOpacity="0" /> */}
                    </LinearGradient>


                    {/* <Rect
                        rx="8"
                        ry="8"
                        x="0" y="0" width={fillWidth} height={height} fill="url(#grad)" /> */}

                    <Rect
                        rx="8"
                        ry="8"
                        x="0" y="0" width={width1} height={height} fill="url(#grad1)" />

                    <AnimatedRect
                        x="0"
                        y="0"
                        rx="8"
                        ry="8"
                        rectwidth={width.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, fillWidth],
                        })}
                        width={width.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, fillWidth],
                        })}
                        height={height}
                        fill={`url(#HeathManaBar-gradient)`}
                    />

                </Svg>
            </View>



        );
    }

}
