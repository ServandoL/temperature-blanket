import {gql} from 'graphql-tag';

export const GET_FORECAST_QUERY = gql`
  query Forecast($input: ForecastInput!) {
    forecast(input: $input) {
      data {
        _id
        forecast {
          forecastday {
            date
            date_epoch
            day {
              avgtemp_f
            }
          }
        }
      }
    }
  }
`
export const GET_HISTORY_QUERY = gql`
  query History {
    history {
      data {
        _id
        forecast {
          forecastday {
            date
            date_epoch
            day {
              avgtemp_f
            }
          }
        }
      }
    }
  }
`
