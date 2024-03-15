export type NullableParam<T> = T | null;
export type VoidFunction = () => void;
export type SearchQueryProps = {
	skill: string;
	category: string;
}
export type IdProps = {
	skillFilter: NullableParam<number>;
}
export type CustomArray= {
	id: number;
	name: string;
	value: number;
  }


export type ContractorInputs = {
	user?: User;
	user_skill?: Array<Skill>;
	qualification?: Qualification[];
	vendor?: NullableParam<string>;
	email_official?: NullableParam<string>;
	availability?: number | null;
	contracted_currency?: NullableParam<string>;
	contract_payment?: NullableParam<string>;
	contracted_unit?: NullableParam<number>;
	msa_signed?: NullableParam<boolean>;
	sow_signed?: NullableParam<boolean>;
	msa_expiry_date?: NullableParam<string>;
	sow_expiry_date?: NullableParam<string>;
	remarks?: NullableParam<string>;
	sow?: NullableParam<string>;
	cv?: NullableParam<string>;
	simelabs_cv?: NullableParam<string>;
	[key: string]: any; 
};
export type User = {
	employee_id: NullableParam<string>;
	first_name: NullableParam<string>;
	last_name: NullableParam<string>;
	email: NullableParam<string>;
	phone: NullableParam<string>;
	linkedin: NullableParam<string>;
	reporting_manager: NullableParam<number>;
	designation: NullableParam<number>;
	experience: NullableParam<string>;
	work_mode: NullableParam<number>;
	department: NullableParam<string>;
	start_date: NullableParam<string>;
	end_date: NullableParam<string>;
	address: NullableParam<string>;
};
export type Skill = {
    years_of_experience?: NullableParam<number>;
	months_of_experience?: NullableParam<number>;
	id?: NullableParam<number>;
	experience?: NullableParam<string>;
	rating?: NullableParam<number>;
	skill?: NullableParam<string>;
	category?: NullableParam<string>;
	approval_status?: NullableParam<boolean>;
};
export type Qualification = {
	id?: NullableParam<number>;
	school?: NullableParam<string>;
	qualification?: NullableParam<string>;
	domain?: NullableParam<string>;
	year_of_completion?: NullableParam<string>;
};
export type Experience = {
	id?: NullableParam<number>;
	company?: NullableParam<string>;
	job_title?: NullableParam<string>;
	from_date?: NullableParam<string>;
	to_date?: NullableParam<string>;
};
export type Projects = {
	id?: NullableParam<number>;
	project?: {
		name?: NullableParam<string>;
		project_manager?: NullableParam<string>;
		client?: NullableParam<string>;
		allocation?: NullableParam<string>;
		start_date?: NullableParam<string>;
		end_date?: NullableParam<string>;
		status?: NullableParam<boolean>;
		project_link?: NullableParam<string>;
	};
	role?: {
		id?: NullableParam<number>;
		role?: NullableParam<string>;
	};
	allocation?: NullableParam<string>;
};
export type Proficiency = {
	id: number;
	rating: number;
	description: string;
}

export type ApiResponse = {
	success?: boolean;
	detail?: string;
	code?: number;
	'non-field-error': {
		string?: string;
		code?: string;
	};
	error?: {
		[key: string]: {
			string: string;
			code: string;
		};
	};
};
