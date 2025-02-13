Feature: Automate the Calculate Your Entitlement website

    @Automate @HappyPath
    Scenario: A user navigates to the Calculate Your Entitlement website
        Given a user is on their browser
        When the user navigates to the website
        Then the website is displayed

    @Automate @HappyPath
    Scenario: A user clicks on the button to start the process for the Calculate Your Entitlement website
        Given a user is on their browser
        When the user navigates to the website and clicks the start button
        Then the process has begun

    @Automate @HappyPath
    Scenario: A user progresses through the form with irregular hours
        Given a user is on their browser
        When the user navigates to the website and completes the form with irregular hours
        Then the user's irregular hours entitlement is calculated

    @Automate @HappyPath
    Scenario: A user progresses through the form with regular hours for a full year based on 5 days per week 
        Given a user is on their browser
        When the user navigates to the website and completes the form with regular hours for a full year
        Then the user's full year entitlement is calculated

    @Automate @HappyPath
    Scenario: A user progresses through the form with regular hours for someone leaving part way through a year based on 5 days per week 
        Given a user is on their browser
        When the user navigates to the website and completes the form with regular hours for part of a year
        Then the user's part year entitlement is calculated

    @Automate @HappyPath
    Scenario Outline: A user navigates to the Calculate Your Entitlement website and clicks on the links "<LinkType>"
        Given a user is on their browser
        When the user navigates to the website
        And the user clicks on the link "<LinkType>"
        Then the "<LinkType>" website is displayed
        Examples:
            | LinkType                                                      |
            | Home                                                          |
            | Employing people                                              |
            | Statutory leave and time off                                  |
            | Holidays, time off, sick leave, maternity and paternity leave |
            | Calculate your agricultural worker holiday entitlement        |
            | Holiday entitlement                                           |
            | Night working hours                                           |
            | Sunday working                                                |

    @Automate @NegativeScenario
    Scenario Outline: A user progresses through the form with irregular hours but does not enter information for "<FieldType>"
        Given a user is on their browser
        When the user navigates to the website and starts the irregular hours form but leaves the "<FieldType>" field blank
        Then the relevant "<FieldType>" message is shown
        Examples:
            | FieldType      |
            | Leave Year End |
            | Hours Worked   |

    @Automate @NegativeScenario
    Scenario Outline: A user progresses through the form with regular hours for a full year based on 5 days per week but does not enter information for "<FieldType>"
        Given a user is on their browser
        When the user navigates to the website and starts the regular hours form but leaves the "<FieldType>" field blank
        Then the relevant "<FieldType>" message is shown
        Examples:
            | FieldType                          |
            | Days Per Week Radio Button         |
            | Full Year Entitlement Radio Button |
            | Days Worked Per Week Field         |


