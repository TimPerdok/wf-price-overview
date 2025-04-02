import { Box, Checkbox, FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { useGridFilter } from "ag-grid-react";
import React, { useMemo, useCallback, useEffect } from "react";
import { FlexColumn, FlexRow } from "../layout/Flex";
import styled from "styled-components";
import { AccountCircle, Search } from "@mui/icons-material";

const CheckboxLabelContainer = styled(Box)`
    padding-left: 0.375rem;
    & > label {
        cursor: pointer;
    }
`

export default function ListFilter({ model, onModelChange, getValue, tags }: {
    model: Set<string> | null,
    onModelChange: (model: Set<string> | null) => void,
    getValue: (node: any) => any,
    tags: Set<string>
}) {
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const selectedTags = model || new Set<string>();

    const sortedFilteredTags = useMemo(() => {
        return [...tags]
            .sort((a, b) => {
                const aChecked = selectedTags.has(a) ? -1 : 1;
                const bChecked = selectedTags.has(b) ? -1 : 1;
                return aChecked - bChecked || a.localeCompare(b);
            })
            .filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [tags, searchQuery, selectedTags]);

    const selectTag = useCallback((tag: string) => {
        const newSelectedTags = new Set(selectedTags);
        newSelectedTags.add(tag);
        onModelChange(newSelectedTags);
    }, [selectedTags, onModelChange]);

    const unSelectTag = useCallback((tag: string) => {
        const newSelectedTags = new Set(selectedTags);
        newSelectedTags.delete(tag);
        onModelChange(newSelectedTags.size === 0 ? null : newSelectedTags);
    }, [selectedTags, onModelChange]);

    const doesFilterPass = useCallback(({ node }) => {
        const itemTags = getValue(node) as string[];
        return selectedTags.size === 0 || itemTags.some((tag) => selectedTags.has(tag));
    }, [selectedTags, getValue]);

    useGridFilter({ doesFilterPass });

    return (
        <Box sx={{ padding: "0.5rem", }}>
            <FlexColumn $gapY="0.375rem">
                <SearchBar onChange={(value) => setSearchQuery(value)} />
                {
                    sortedFilteredTags.map((tag) => (
                        <CheckboxGroup
                            key={tag}
                            onChange={(checked: boolean) => {
                                checked ? selectTag(tag) : unSelectTag(tag);
                            }}
                            checked={selectedTags.has(tag)}
                            label={tag}
                            id={`tag-${tag}`} />
                    ))
                }
                {
                    !sortedFilteredTags.length && searchQuery && (
                        "No results"
                    )
                }
            </FlexColumn>
        </Box>
    );
}

function CheckboxGroup({
    onChange,
    label,
    id,
    checked
}: {
    checked: boolean,
    onChange: (checked: boolean) => void,
    label?: string,
    id?: string,
}) {
    return <FlexRow $alignVertical="center">
        <Checkbox
            sx={{
                '& .MuiSvgIcon-root': { fontSize: "1rem" },
                padding: 0,
                marginBottom: "-2px"
            }}
            checked={checked}
            id={`tag-${id}`}
            onChange={({ target: { checked } }) => onChange(checked)}
        />
        <CheckboxLabelContainer>
            <label htmlFor={`tag-${id}`}>
                {label}
            </label>
        </CheckboxLabelContainer>
    </FlexRow>
}


function SearchBar({ onChange }: { onChange: (value: string) => void }) {
    return (
        <Box sx={{
            padding: "0.375rem 0",
        }}>
            <Input
                onChange={({ target: { value } }) => onChange(value)}
                placeholder="Search..."
                size="small"
                sx={{
                    fontSize: "14px",
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                }
            />
        </Box>
    );
}

export function ListFilterLabel({ model }: { model: Set<string> | null }) {

    const tagString = useMemo(() => {
        if (!model) return "";
        return [...model].join(", ");
    }, [model]);

    return <>
        <div className="ag-labeled ag-label-align-left ag-number-field ag-input-field">
            <div className="ag-wrapper ag-input-wrapper">
                <input
                    disabled
                    className="ag-input-field-input ag-number-field-input"
                    value={tagString}
                    title={tagString}
                />
            </div>
        </div>

    </>
}