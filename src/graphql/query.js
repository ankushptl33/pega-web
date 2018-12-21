export const GET_PRACTICE = `query ($input:GetPracticesInput){
    getPractices (input:$input){
      id
      externalid
      name
      inactive
    }
  }`;

export const GET_MEASURE_SET = `query($input:GetMeasureSetsInput){
    getMeasureSets(input:$input){
      id
      name
      inactive
      ispqrs
      isformips
      listorder
    }
  }
`;

export const GET_CALENDAR = `query($input:GetCalendarsInput){
    getCalendars(input:$input){
      id
      year
      flag
      duration
      startdate
      enddate
    }
  }`;

export const GET_MEASURES = `
query($input:GetMeasuresInput){
  getMeasures(input:$input){
    id
    measuredescription
    domaindescription
    measureno
    displayname
    measuredescription
    isinverse
    IsFavorite
    rational
	}
}
`;

export const GET_MEASURE_PERFORMANCE = `
  query($input:FilterMeasureInfoInput){
    getMeasurePerformanceAverage(input:$input){
      EntityAverage
      CMSBenchmark
      RegistryAverage
      RegistryBenchmark
      EntityComparison
    }
  }
`;

export const GET_LOCATIONS = `
query($input:GetLocationsInput) {
  getLocations(input:$input) {
    id
    name
    city
    address
    }
  }  
`;

export const GET_PROVIDERS = `
query($input: getProvidersByPracticeIdInput!){
  getProvidersByPracticeId(input:$input){
    firstname
    lastname
    id
    istest
    tin
      country
    }
  }`;

export const GET_PERFORMANCE_TREND_INFO = `
query($input:FilterTrendInfoInput){
  getPerformanceTrendInfo(input:$input){
    DurationName
    EntityName
    EntityId
    ParentEntityId
    ParentEntityName
    MeasureId
    Numerator
    Denominator
    Exception
    Exclusion
    RegistryAverage
    MeasureAverage
    DurationFrom
    DurationTo
    ListOrder
  }
      }
`;

export const GET_ALL_MEASURE_OUTPUT = `
query($input:FilterMeasureInfoInput){
  getMeasureOutputByEntity(input:$input){    
    EntityName
    EntityId
    ParentEntityId
    ParentEntityName
    MeasureId
    Numerator
    Denominator
    Exception
    Exclusion
  }
  }`;

export const GET_PRACTICE_REFRESH_DATE = `
query($input: GetPracticeRefreshStatusInput!){
  getPracticeRefreshStatus(input:$input)
  {
    id
    startdate
    enddate
    lastrefreshtime
    practiceid
    jobid
    status
    practice
    {
      id
      name
    }
  }
}`;

export const GET_PRACTICE_PROVIDER_COUNT = `
query ($input: GetProviderCountInput!) {
  getProviderCount(input:$input)
  {
    count
  }  
}
`;

export const GET_PRACTICE_LOCATION_COUNT = `
query ($input: GetLocationCountInput!)
{
  getLocationCount (input:$input){
    count
  }
}
`;

export const SET_USER_FAVORITE_MEASURE = `
mutation($input:FavoriteInput!){
  setFavorite(input:$input)
}`;

export const GET_PATIENTS_BY_ENTITY = `
query($input:InputFilterTrendInfo){
  getAllPatientByEntity(input:$input){
    patient_id
    firstname
    dob
    mrn
    gender
    TotalRecords
  }
}
`;

export const VALIDATE_REGISTRY_TOKEN = `
query($Token:String!){
  validateRegistryDeshboardToken(Token:$Token){
    data {
      token
      duration
    }
    statusCode
    description
  }
}
`;
