//create an index for all services in this folder

import { getLabels, addLabel, removeLabel, getRolesByLabelName } from './labels';
import { postUsers, getUserById, updateUser, deleteUser } from './users';
import { getRoles, getRole, getLabelsByRoleName, updateRole, deleteRole, postRoles } from './roles';
import { signIn, signUp, lostPassword, changePassword } from './auth';
import { getJobs, postJobs } from './jobs';
import { getModalities, updateModality, deleteModality, echoModality } from './modalities';
import { getOauth2Config, postOauth2Config, deleteOauth2Config } from './oauth2';
import { getOptions, updateAutoQueryOptions } from './options';
import { getOrthancSystem, modifyPatient, deletePatient, orthancReset, orthancShutdown, updateVerbosity, getVerbosity, getPatient } from './orthanc';
import { updatePeer, getPeers, echoPeer, deletePeer } from './peers';
import { queryModality, makeRetrieve } from './query';
import { findTools } from './tools';
import { useConfirm } from './ConfirmContextProvider';
export {
    addLabel,
    changePassword,
    deleteModality,
    deleteOauth2Config,
    deletePeer,
    deleteRole,
    deleteUser,
    deletePatient,
    echoModality,
    echoPeer,
    findTools,
    getLabels,
    getModalities,
    getOauth2Config,
    getOptions,
    getOrthancSystem,
    getLabelsByRoleName,
    getPatient,
    getPeers,
    getRole,
    getRoles,
    getRolesByLabelName,
    getVerbosity,
    getUserById,
    getJobs,
    lostPassword,
    modifyPatient,
    orthancReset,
    orthancShutdown,
    postJobs,
    postOauth2Config,
    queryModality,
    makeRetrieve,
    postRoles,
    postUsers,
    removeLabel,
    signIn,
    signUp,
    updateModality,
    updateAutoQueryOptions,
    updatePeer,
    updateUser,
    updateRole,
    updateVerbosity,
    useConfirm
};

