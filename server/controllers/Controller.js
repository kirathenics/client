import { ProfileSchema, FacultySchema, DepartmentSchema, TitleSchema } from '../models/index.js'

export const getTop3 = async (request, response) => {
    try {
        const profiles = await ProfileSchema.find().select('_id fullName profileLink imageLink cited __v').sort({'cited': -1 }).limit(3)
        if (!profiles) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(profiles)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getProfiles = async (request, response) => {
    try {
        const profiles = await ProfileSchema.find().select('-citationArray').sort({'hIndex': -1 })

        if (!profiles) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(profiles)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getProfilesFiltered = async (request, response) => {
    try {
        const arrDepartments = await (request.query.arrDepartments ? request.query.arrDepartments : [])
        const arrFaculties = await (request.query.arrFaculties ? request.query.arrFaculties : [])
        const arrTitles = await (request.query.arrTitles ? request.query.arrTitles : [])
        let query = {}
        
        if (arrDepartments.length !== 0) query['department'] = { $in: arrDepartments }
        if (arrFaculties.length !== 0) query['faculty'] = { $in: arrFaculties }
        if (arrTitles.length !== 0) query['title'] = { $in: arrTitles }

        const profiles = await ProfileSchema.find(query).select('-citationArray').sort({'hIndex': -1 })

        if (!profiles) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(profiles)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getProfilesHIndex = async (request, response) => {
    try {
        const profiles = await ProfileSchema.find().select('hIndex')

        if (!profiles) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(profiles)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getFaculties = async (request, response) => {
    try {
        const faculties = await FacultySchema.find().select('-citationArray').sort({'hIndex': -1 })

        if (!faculties) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(faculties)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getDepartments = async (request, response) => {
    try {
        const departments = await DepartmentSchema.find().select('-citationArray').sort({'hIndex': -1 })

        if (!departments) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(departments)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getTitles = async (request, response) => {
    try {
        const titles = await TitleSchema.find().select('-citationArray').sort({'hIndex': -1 })

        if (!titles) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(titles)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getFacultiesPies = async (request, response) => {
    try {
        const faculties = await FacultySchema.find().select('name cited hIndex').sort({'hIndex': -1 })

        if (!faculties) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(faculties)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getDepartmentsPies = async (request, response) => {
    try {
        const departments = await DepartmentSchema.find().select('name cited hIndex').sort({'hIndex': -1 })

        if (!departments) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(departments)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getTitlesPies = async (request, response) => {
    try {
        const titles = await TitleSchema.find().select('name cited hIndex').sort({'hIndex': -1 })

        if (!titles) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(titles)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getFacultiesLines = async (request, response) => {
    try {
        const faculties = await FacultySchema.find().select('name citationArray')

        if (!faculties) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(faculties)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getDepartmentsLines = async (request, response) => {
    try {
        const departments = await DepartmentSchema.find().select('name citationArray')

        if (!departments) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(departments)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}

export const getTitlesLines = async (request, response) => {
    try {
        const titles = await TitleSchema.find().select('name citationArray')

        if (!titles) return response.status(400).json({
            message: 'Данные не найдены'
        })

        response.status(200).json(titles)
    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: 'Не удалось считать данные'
        })
    }
}
