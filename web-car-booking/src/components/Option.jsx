import React from 'react'

export default function Option({ value, text }) {
    return (
        <option className="text-black font-medium" value={value} >{text}</option>
    )
}
