import React, {useEffect, useState} from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {ApplicationForm} from "./ApplicationForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {ApplicationList} from "./ApplicationList";
import {ApplicationDetailsCard} from "./ApplicationDetailsCard";
import {Application} from "../utils/interfaces";
import {LoginForm} from "./LoginForm";
import {Utils} from "../utils/utils";

export default function App() {
    const [defaultActiveKey, setDefaultActiveKey] = useState<string>("apps");
    const [showDetails, setShowDetails] = useState<Boolean>(false);
    const [application, setApplication] = useState<Application | undefined>();
    const [loggedin, setLoggedin] = useState<boolean>(false);

    useEffect(() => {
        getLoginInfo();

        // chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        //     const currentTabId = tabs[0].id ?? 0;
        //     const currentTabUrl = tabs[0].url;
        //     chrome.tabs.sendMessage(
        //         currentTabId,
        //         JSON.stringify({msg: "Job data requested", url: currentTabUrl}),
        //         (response) => {
        //             console.log("Message form Content Script: ", response);
        //         }
        //     );
        // });
    }, []);

    const appListCallback = (app?: Application, tab?: string) => {
        setShowDetails(!showDetails);
        if (tab) {
            setDefaultActiveKey(tab);
        }
        if (app) {
            setApplication(app);
        }
    };

    const getLoginInfo = () => {
        if (window.localStorage.getItem(Utils.TOKEN_STORAGE_KEY)) {
            setLoggedin(true);
        }
    };

    const loginCallback = () => {
        setLoggedin(true)
    }


    return (
        <div style={{backgroundColor: "rgb(183, 221, 230)"}}>
            <div style={{border: "3px solid grey"}}>
                <h4 className="mt-3 text-center">Job Application Tracker</h4>

                {
                    loggedin ? (
                        showDetails ? (
                            <ApplicationDetailsCard
                                callback={appListCallback}
                                application={application}
                            />
                        ) : (
                            <Tabs
                                fill
                                defaultActiveKey={defaultActiveKey}
                                id="uncontrolled-tab-example"
                                className="mx-3"
                            >
                                <Tab eventKey="create" title="Create">
                                    <ApplicationForm/>
                                </Tab>
                                <Tab eventKey="apps" title="Applications">
                                    <ApplicationList callback={appListCallback}/>
                                </Tab>
                            </Tabs>
                        )
                    ) : (
                        <LoginForm callback={loginCallback}/>
                    )
                }

            </div>
        </div>
    );
}
