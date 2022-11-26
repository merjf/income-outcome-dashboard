import pandas as pd
from pandas.core.frame import DataFrame
import numpy as np
import json

def loadData():
    filedf = pd.read_csv('ListaMovimenti.csv', sep=';')
    dataFrame = pd.DataFrame()
    for index, row in filedf.iterrows():
        if pd.isnull(row[1]):
            operation = float(row[2].replace('.', '').replace(',', '.'))
        else:
            operation = -float(row[1].replace('.', '').replace(',', '.'))
        newItem = { 'operation': operation, 'description': row[3], 'valueDate': row[0]}
        dataFrame = dataFrame.append(newItem, ignore_index=True)
    dataFrame['valueDate'] = pd.to_datetime(dataFrame['valueDate'], format='%d/%m/%Y')
    return dataFrame

def getData():
    dataFrame = loadData()
    dataFrame = refineData(dataFrame)
    generalValues = extractGeneralValues(dataFrame.copy())
    weekAmounts = dataFrame['operation'].groupby(dataFrame['valueDate'].dt.to_period('W')).sum()
    yearIncomeOutcome = extractYearIncomeOutcome(dataFrame.copy())
    salaries = getSalary(dataFrame.copy())
    amazonExpenses = getAmazonExpenses(dataFrame.copy())
    outcomePerType = extractOutcomePerType(dataFrame.copy())
    return [generalValues, weekAmounts.to_json(orient='records'), yearIncomeOutcome, salaries, amazonExpenses, outcomePerType]

def refineData(dataFrame):
    return dataFrame[~dataFrame['description'].str.contains("GIROFONDO")]

def extractGeneralValues(dataFrame):
    sum = dataFrame["operation"].sum()
    mean = dataFrame["operation"].mean()
    min = dataFrame["operation"].min()
    max = dataFrame["operation"].max()
    operations = dataFrame["operation"]
    valueDates = dataFrame["valueDate"]
    firstDate = dataFrame["valueDate"].min()
    lastDate = dataFrame["valueDate"].max()
    totSalaries = extractSalary(dataFrame.copy())["operation"].sum()
    totAmazonExpenses = extractAmazonExpenses(dataFrame.copy())["operation"].sum()
    return json.dumps({
        'sum': sum,
        'mean': mean,
        'min': min,
        'max': max,
        'operations': operations.to_json(orient='records'),
        'valueDates': valueDates.to_json(orient='records'),
        'firstDate': firstDate.strftime("%d/%m/%Y"),
        'lastDate': lastDate.strftime("%d/%m/%Y"),
        'totAmazonExpenses': totAmazonExpenses,
        'totSalaries': totSalaries
    })

def extractYearIncomeOutcome(dataFrame):
    positiveOperations = dataFrame.loc[dataFrame['operation'] > 0].sort_values(by="valueDate").drop('description', 1)
    negativeOperations = dataFrame.loc[dataFrame['operation'] < 0].sort_values(by="valueDate").drop('description', 1)
    sumPositiveOperations = np.sum(positiveOperations['operation'])
    sumNegativeOperations = np.sum(negativeOperations['operation'])
    return json.dumps({
        'positiveOperations': positiveOperations.to_json(orient='records'),
        'negativeOperations': negativeOperations.to_json(orient='records'),
        'sumPositiveOperations': sumPositiveOperations,
        'sumNegativeOperations': sumNegativeOperations
    })

def getSalary(dataFrame):
    return extractSalary(dataFrame).to_json(orient='records')

def extractSalary(dataFrame):
    salaries = dataFrame.loc[dataFrame['operation'] > 0].sort_values(by="valueDate")
    salaries = salaries[salaries['description'].str.contains("NIVAURA|AGILE|FINCONS")]
    return salaries.drop('description', 1)

def getAmazonExpenses(dataFrame):
    return extractAmazonExpenses(dataFrame).to_json(orient='records')

def extractAmazonExpenses(dataFrame):
    outcome = dataFrame.loc[dataFrame['operation'] < 0].sort_values(by="valueDate")
    outcome = outcome[outcome['description'].str.contains("(?i)amazon|AMZN", case=False)]
    return outcome.drop('description', 1)

def extractOutcomePerType(dataFrame):
    allOutcome = dataFrame.loc[dataFrame['operation'] < 0].sort_values(by="valueDate")
    multimediaCosts = allOutcome[allOutcome['description'].str.contains("(?i)spotify|netflix|disney|iliad|fastweb|wind|telecom", case=False)]["operation"].sum()
    fixedCosts = allOutcome[allOutcome['description'].str.contains("(?i)picicuto|profeta|parking|nicita", case=False)]["operation"].sum()
    gasolioCosts = allOutcome[allOutcome['description'].str.contains("(?i)esso|petrol|eni|stazione|distributore|tamoil", case=False)]["operation"].sum()
    marketCosts = allOutcome[allOutcome['description'].str.contains("(?i)conad|crai|mercat|kasanova|lidl|esselunga|iper|penny|auchan|deco|eurospin|linda|discount", case=False)]["operation"].sum()
    diningOut = allOutcome[allOutcome['description'].str.contains("(?i)scuderi|burger|borgo|canusciuti|tortellino|risto|food|gelsobianco|terrazza|trattori|spinella|panin", case=False)]["operation"].sum()
    drinkingOut = allOutcome[allOutcome['description'].str.contains("(?i)mono|ma..si|bar|caff|cafe|gammazita|club|lido|highlander|vermut|amorelli", case=False)]["operation"].sum()
    clothesCosts = allOutcome[allOutcome['description'].str.contains("(?i)jones|north|decathlon|looker|scout|celio|coin|zalando|sarto|calzedonia", case=False)]["operation"].sum()
    gamesCosts = allOutcome[allOutcome['description'].str.contains("(?i)steam|league|riot", case=False)]["operation"].sum()
    vehicleCosts = allOutcome[allOutcome['description'].str.contains("(?i)crimi|pedaggio|assicurazione|pneumatici", case=False)]["operation"].sum()
    #cash = allOutcome[allOutcome['description'].str.contains("(?i)prelievo", case=False)]["operation"].sum()
    findomestic = allOutcome[allOutcome['description'].str.contains("(?i)findomestic", case=False)]["operation"].sum()
    #ohterCosts = allOutcome[allOutcome['description'].str.contains("(?i)", case=False)]
    return json.dumps({
        'multimediaCosts': multimediaCosts,
        'fixedCosts': fixedCosts,
        'gasolioCosts': gasolioCosts,
        'marketCosts': marketCosts,
        'diningOut': diningOut,
        'drinkingOut': drinkingOut,
        'clothesCosts': clothesCosts,
        'gamesCosts': gamesCosts,
        'vehicleCosts': vehicleCosts,
        #'cash': cash,
        'findomestic': findomestic
    })