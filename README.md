# TdarrMathsPlugins - Mathematic Plugins for Tdarr

just add the **`tools`** folder from this repository to your local flows folder

{Tdarr install folder}\server\Tdarr\Plugins\FlowPlugins\LocalFlowPlugins

e.g. C:\ProgramData\Tdarr\server\Tdarr\Plugins\FlowPlugins\LocalFlowPlugins

the plugins will then show up on the **local** tab on the flows page.

## How to Use Calculations Plugin

We Start by adding a `SetFlowVariable` plugin to the flow. We dont have to set a `SetFlowVariable` if we want to start the first number at 0 but it's good practice in case you need to change the calculation starting number further down the line.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/1-Calculation-SetFlowVariable.png "Add SetFlowVariable and change the settings")
Then we can add the `Var Calculations` plugin to the flow and set the plugin settings. the `User Variable` must be the name of the variable in the first step, you can't pass `{{{args}}}` into this plugin as it uses the variable name to calculate and update that variable.
![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/2-Calculation-Add2.png "Add SetFlowVariable and change the settings")

![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/3-Calculation-Multiply5.png "Add SetFlowVariable and change the settings")

![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/4-Calculation-Tutorial.png "Add SetFlowVariable and change the settings")

![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/5-Calculation-AddLogFeedback.png "Add SetFlowVariable and change the settings")

![alt text](https://github.com/digitalassassins/TdarrMathsPlugins/blob/main/screenshots/6-Calculation-MultiplyLogFeedback.png "Add SetFlowVariable and change the settings")

## How to Use Greater / Less Than Plugin

## How to Use Odd/Even Plugin

## How to Use ArrayLoop Plugin

### Real World Usage Examples
