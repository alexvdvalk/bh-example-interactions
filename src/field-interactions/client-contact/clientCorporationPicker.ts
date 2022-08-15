const interaction: FieldInteraction = {
  fieldName: "clientCorporationID",
  name: "change client corporation picker",
  event: "init",
  sortOrder: 1,
  invokeOnInit: false,
  script: (API: FieldInteractionAPI) => {
    const fields = ["address", "fax", "id", "name", "phone", "status"];
    API.modifyPickerConfig("clientCorporation", {
      optionsPromise: function (term) {
        const mainQuery = `status='Active Account' AND name LIKE ${encodeURIComponent(
          " '%" + term + "%'"
        )}`;
        let url = `query/ClientCorporation?where=${mainQuery}&fields=${fields.join(
          ","
        )}`;
        return API.appBridge.httpGET(url).then((res) => {
          if (res.data.data) {
            let companies = res.data.data.map((company) => {
              company.searchEntity = "ClientCorporation";
              return company;
            });
            console.log("companies", companies);
            return companies;
          }
          return;
        });
      },
    });
  },
};

export default interaction;
