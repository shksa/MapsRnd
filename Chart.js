import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory-native';

const data = [
  {x: 1, y: 130},
  {x: 2, y: 165},
  {x: 3, y: 142},
  {x: 4, y: 190},
];

const Chart = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.chartContainer}>
          <VictoryChart
            height={350}
            theme={VictoryTheme.material}
            padding={{top: 50, bottom: 50, left: 50, right: 20}}>
            <VictoryLine
              data={data}
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
            />
          </VictoryChart>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  chartContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chart;
