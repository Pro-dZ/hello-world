var showMenu = true;

function genText(dictionary) {
    
}

function start() {
    var setupJSON = getSetup();
    setupButtons(setupJSON.setups);
}

function getSetup() {
    return {
        dictTest : [
            { txt: "PHILIPPE !", type: "pn", use: "apos" },
            { txt: "amérindien.", type: "adj", use: "end" },
            { txt: "c'est incroyable", type: "grp", use: "intro" },
            { txt: "oui", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" },
            { txt: "", type: "", use: "" }
        ],
        dictionary: [
            [
                "PHILIPPE !",
                "amérindien.",
                "c'est incroyable :",
                "oui.",
                " << le Zambèze >> ",
                "Montseauche-les-Settons",
                "c'est possible que",
                "voila.",
                "bonjour,",
                "pomme",
                "des anchois,",
                "non.",
                "en effet, ",
                "le bureau",
                "du hachis",
                "vive les brocolis !",
                "Il est 9h 30,"
            ],
            [
                "Je me répète à l'infini"
            ],
            [
                
            ]
        ],
        refs: {
            buttons: [
                "fb-f",
                "fb-b",
                "clr",
                "sv",
                "ld"
            ],
            labels: null,
            useDict: 0
        },
        setups: [
            {
                buttonName: "fb-b",
                events: [
                    {
                        name: "mouseup",
                        action: function (e) {
                            this.style.color = "rgb(0,0,0)";
                        }
                    },
                    {
                        name: "mousedown",
                        action: function (e) {
                            this.style.color = "rgb(200,0,0)";
                            var sandbox = document.getElementById("sandbox");
                            var elem = sandbox.children.item(sandbox.childElementCount - 1);
                            if (elem) { sandbox.removeChild(elem); }
                        }
                    }
                ]
            },
            {
                buttonName: "fb-f",
                events: [
                    {
                        name: "mouseup",
                        action: function (e) {
                            this.style.color = "rgb(0,0,0)";
                        }
                    },
                    {
                        name: "mousedown",
                        action: function (e) {
                            this.style.color = "rgb(200,0,0)";
                            var p = document.createElement("span");
                            var dict = getSetup().dictionary[getSetup().refs.useDict];
                            var index = Math.floor(Math.random() * dict.length) % dict.length;
                            p.innerHTML = dict[index];
                            document.getElementById("sandbox").appendChild(p);
                        }
                    }
                ]
            },
            {
                buttonName: "clr",
                events: [
                    {
                        name: "mouseup",
                        action: function (e) {
                            this.style.color = "rgb(0,0,0)";
                        }
                    },
                    {
                        name: "mousedown",
                        action: function (e) {
                            this.style.color = "rgb(200,0,0)";
                            var sandbox = document.getElementById("sandbox");
                            while (sandbox.firstChild) {
                                sandbox.removeChild(sandbox.firstChild);
                            }
                        }
                    }
                ]
            },
            {
                buttonName: "sv",
                events: [
                    {
                        name: "mouseup",
                        action: function (e) {
                            this.style.color = "rgb(0,0,0)";
                        }
                    },
                    {
                        name: "mousedown",
                        action: function (e) {
                            this.style.color = "rgb(200,0,0)";
                            var sandbox = document.getElementById("sandbox").cloneNode(2);
                            var finaltxt = "";
                            while (sandbox.firstChild) {
                                if (sandbox.firstChild.innerHTML !== undefined) {
                                    finaltxt += "|" + sandbox.firstChild.innerHTML;
                                }
                                sandbox.removeChild(sandbox.firstChild);
                            }
                            console.log(finaltxt);
                            
                            var blob = new Blob([finaltxt], {type: "text/plain;charset=utf-8"});

                            saveAs(blob, "save-" + Math.floor(Math.random() * 1000));
                        }
                    }
                ]
            },
            {
                buttonName: "ld",
                events: [
                    {
                        name: "mousedown",
                        action: function (e) {
                            this.style.color = "rgb(200,0,0)";
                        }
                    },
                    {
                        name: "mouseup",
                        action: function (e) {
                            var sandbox = document.getElementById("sandbox").cloneNode(2);
                            var txt = prompt("Copiez une phrase venant d'une précédente sauvegarde");
                            var modules = txt.split("|");
                            for (var i = 0; i < modules.length; i++) {
                                var p = document.createElement("span");
                                p.innerHTML = modules[i];
                                document.getElementById("sandbox").appendChild(p);
                            }
                            this.style.color = "rgb(0,0,0)";
                        }
                    }
                ]
            },
            {
                buttonName: "hide",
                events: [
                    {
                        name: "mouseup",
                        action: function (e) {
                            if(showMenu) {
                                showMenu = false;
                                document.getElementById("genMenu").style.visibility = "hidden";
                                this.innerHTML = "+";
                            } else {
                                showMenu = true;
                                document.getElementById("genMenu").style.visibility = "visible";
                                this.innerHTML = "-";
                            }
                            this.visibility = "visible";
                            this.style.color = "rgb(0,150,0)";
                        }
                    }, 
                    {
                        name: "mousedown",
                        action: function (e) {
                            this.style.color = "rgb(0,100,150)";
                        }
                    }
                ]
            }
        ]
    };
}

function setupButtons(setups) {
    for (var i = 0; i < setups.length; i++) {
        var setButton = document.getElementById(setups[i].buttonName);
        var setEvents = setups[i].events;
        for (var j = 0; j < setEvents.length; j++) {
            setButton.addEventListener(setEvents[j].name, eval(setEvents[j].action));
        }
    }
}